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
    new Producto('Pantalón', 20000),
    new Producto('Campera', 10000)
];

function comprarProducto() {
    let nombre;
    let compra = [];
    let producto;

    while (compra.length === 0) {
        nombre = prompt(`Productos: \n\n${productos.map(producto => `Prenda: ${producto.nombre}\nPrecio: ${producto.precio}\nStock: ${producto.stock}`).join('\n\n')}\n\nIngrese el nombre del producto a comprar`).toLocaleLowerCase();
        
        if (nombre) {
            compra = productos.filter(producto => producto.nombre.toLocaleLowerCase() === nombre.toLocaleLowerCase());
            if (compra.length === 0) {
                console.log('Producto no encontrado');
            }
        } else {
            console.log('Nombre no válido');
        }
    }

    if (compra.length > 1) {
        const productIndex = parseInt(prompt(`Productos: \n\n${compra.map((producto, index) => `(${index + 1}) Prenda: ${producto.nombre}\nPrecio: ${producto.precio}\nStock: ${producto.stock}`).join('\n\n')}\n\nIngrese el número del producto a comprar`)) - 1;
        
        if (productIndex >= 0 && productIndex < compra.length) {
            producto = compra[productIndex];
        } else {
            console.log('Producto no encontrado');
            comprarProducto();
        }
    } else if (compra.length === 1) {
        producto = compra[0];
    }

    if (producto) {
        const cantidad = parseInt(prompt('Ingrese la cantidad a comprar'));
        if (cantidad <= producto.stock) {
            producto.stock -= cantidad;
            console.log(`Compra realizada con éxito\nNombre: ${producto.nombre}\nPrecio: ${producto.precio}\nCantidad: ${cantidad}`);
        } else {
            console.log('No hay stock suficiente');
            comprarProducto();  
        }
    }
}

function venderProducto() {
    const nombre = prompt('Ingrese el nombre del producto');
    let precio
    while (true) {
        precio = parseInt(prompt('Ingrese el precio del producto'));
        if (!isNaN(precio) && precio > 0) {
            break;
        } else {
            console.log('Precio inválido, ingrese un número mayor a 0');
        }
    }
    let stock;
    while (true) {
        stock = parseInt(prompt('Ingrese el stock del producto'));
        if (!isNaN(stock)) {
            break;
        }
        console.log('Por favor, ingrese un stock con valor numérico.');
    }
    if (nombre && precio && stock) {
        const producto = new Producto(nombre, precio, stock);
        productos.push(producto);
        console.log(`Producto agregado:\nNombre: ${producto.nombre}\nPrecio: ${producto.precio}\nStock: ${producto.stock}`);
    }
}   


const nombre = prompt('¿Cuál es tu nombre?');
const apellido = prompt('¿Cuál es tu apellido?');

for (let i = 0; i < 3; i++) {
    const operacion = parseInt(prompt(`Bienvenido a nuestro tienda ${nombre} ${apellido}, ¿con qué podemos ayudarte hoy?\n1: Comprar un producto\n2: Vender un producto\n3: Salir`));

    switch (operacion) {
        case 1:
            comprarProducto();
            break;
        case 2:
            venderProducto();
            break;
        case 3:
            alert('Gracias por visitarnos');
            console.log('Salir');
            break;
        default:
            console.log('Operación no válida');
            break;
    };
};

console.log(productos);
