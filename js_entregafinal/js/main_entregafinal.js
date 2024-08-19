let set_id = 1;
class Producto {
    constructor(nombre, precio, stock) {
        this.id = set_id++;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock || Math.ceil((Math.random() * 20));
    };
};

const productos = [
    new Producto('Remera', 15000),
    new Producto('Pantalon', 20000),
    new Producto('Campera', 10000),
    new Producto('Buzo', 8000),
    new Producto('Sueter', 25000),
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

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

let botonVaciar = document.querySelector('#vaciarCarrito');

botonVaciar.addEventListener('click', () => {
    carrito = {};
    saveCarrito();
    updateCartCount();
});

document.querySelector('.btn-dark').addEventListener('click', function () {
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
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const direccion = document.getElementById('direccion').value;
            const tipoPago = document.getElementById('tipoPago').value;

            if (!tipoPago) {
                Swal.showValidationMessage('Por favor, elija un metodo de pago.');
            } else {
                return {
                    nombre: nombre,
                    email: email,
                    direccion: direccion,
                    tipoPago: tipoPago
                };
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
});

function updateCartCount() {
    let itemCount = Object.values(carrito).reduce((total, producto) => total + producto.cantidad, 0);
    cartCount.textContent = itemCount;
}
renderCarrito();
updateCartCount();
