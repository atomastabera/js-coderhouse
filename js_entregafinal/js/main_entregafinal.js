let set_id = 1;
let productos = []; 
let carrito = JSON.parse(localStorage.getItem('carrito')) || {}; 
let cartCount = document.querySelector('#cartCount');
class Producto {
    constructor(nombre, precio, stock) {
        this.id = set_id++;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock || Math.ceil((Math.random() * 20));
    };
};

function renderProducts() {
    let productCards = document.querySelector('#tarjeta');

    productos.forEach((producto) => {
        let newCard = document.querySelector('#templateTarjeta').content.cloneNode(true);

        newCard.querySelector('h4').textContent = producto.nombre;
        newCard.querySelector('p').textContent += producto.precio;

        let boton = newCard.querySelector('button');

        boton.addEventListener('click', () => {
            Toastify({
                text: "Agregaste un producto a tu carrito 🛒",
                duration: 800
            }).showToast();
            addProduct(producto.id);
        });

        productCards.appendChild(newCard);
    });
}

function addProduct(id) {
    let product = productos.find(producto => producto.id === id);
    if (product) {
        if (carrito[id]) {
            carrito[id].cantidad++;
        } else {
            carrito[id] = { ...product, cantidad: 1 };
        }
    }
    saveCarrito();
    updateCartCount();
}

function removeProduct(id) {
    if (carrito[id]) {
        carrito[id].cantidad--;
        if (carrito[id].cantidad === 0) {
            delete carrito[id];
        }
        saveCarrito();
        updateCartCount();
    }
}

function saveCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

let carritoCardsOld = document.querySelector('#tarjetaCarrito').cloneNode(true);

function renderCarrito() {
    let carritoCards = document.querySelector('#tarjetaCarrito');

    carritoCards.innerHTML = carritoCardsOld.innerHTML;
    Object.values(carrito).forEach((producto) => {
        let newCard = document.querySelector('#templateCarrito').content.cloneNode(true);

        newCard.querySelector('h4').textContent = producto.nombre;
        newCard.querySelector('#precio').textContent += producto.precio;
        newCard.querySelector('#cantidad').textContent += producto.cantidad;

        let boton = newCard.querySelector('button');

        boton.addEventListener('click', () => {
            removeProduct(producto.id);
        });

        carritoCards.appendChild(newCard);
    });

    validateEmptyCart();
    updateTotal();
}

function validateEmptyCart() {
    let boton = document.querySelector('#vaciarCarrito');
    boton.disabled = Object.keys(carrito).length === 0;
}

function updateTotal() {
    let total = Object.values(carrito).reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    document.querySelector('#carritoTotal').textContent = `Total $${total}`;
}

let botonVaciar = document.querySelector('#vaciarCarrito');

botonVaciar.addEventListener('click', () => {
    carrito = {};
    saveCarrito();
    updateCartCount();
});

document.querySelector('.btn-dark').addEventListener('click', function () {
    validateCartNotEmpty()
        .then(() => {
            Swal.fire({
                title: 'Datos personales',
                html: `
                    <input type="text" id="nombre" class="swal2-input" placeholder="Nombre Completo">
                    <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico">
                    <input type="text" id="direccion" class="swal2-input" placeholder="Dirección">
                    <select id="tipoPago" class="swal2-select">
                        <option value="" disabled selected>Selecciona el método de pago</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Efectivo">Efectivo</option>
                    </select>
                `,
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    const tipoPago = document.getElementById('tipoPago').value;

                    if (!tipoPago) {
                        Swal.showValidationMessage('Por favor, elija un método de pago.');
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(result.value);
                    Swal.fire({
                        icon: 'success',
                        title: 'Compra realizada',
                        text: 'Tu compra ha sido procesada con éxito.'
                    });
                }
            });
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Carrito vacío',
                text: 'Por favor, agregue productos al carrito antes de realizar la compra.'
            });
        });
});

function validateCartNotEmpty() {
    return new Promise((resolve, reject) => {
        if (Object.keys(carrito).length > 0) {
            resolve();
        } else {
            reject();
        }
    });
}

function updateCartCount() {
    let itemCount = Object.values(carrito).reduce((total, producto) => total + producto.cantidad, 0);
    cartCount.textContent = itemCount;
}

fetch('./base_de_datos/datos.json')
    .then(response => response.json())
    .then(data => {
        productos = data.map(item => new Producto(item.nombre, item.precio, item.stock));
        renderProducts();
    })
    .catch(error => console.error('Error fetching products:', error)); 
    
renderCarrito();
updateCartCount();