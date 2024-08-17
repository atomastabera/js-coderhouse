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
}

function removeProduct(id) {
    if (carrito[id]) {
        carrito[id].cantidad--;
        if (carrito[id].cantidad === 0) {
            delete carrito[id];
        }
        saveCarrito();
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
            duration: 1000
            }).showToast();
        addProduct(producto.id);
    });

    productCards.appendChild(newCard);
});

let boton = document.querySelector('#vaciarCarrito');

boton.addEventListener('click', () => {
    carrito = {};
    saveCarrito();
});

renderCarrito();
