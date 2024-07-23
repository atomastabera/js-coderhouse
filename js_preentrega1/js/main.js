
let nombre = prompt('ingrese nombre')
let apellido = prompt('ingrese apellido')
alert(`Bienvenido ${nombre} ${apellido}, a continuacion seleccione la moneda que desea comprar`)

let operando;

for (let i = 0; i < 2; i++)
{
    let moneda = prompt('Escriba la moneda que desea comprar:  \n Dolar \n Libra \n Euro \n Real').toLocaleLowerCase();

    let dolar = 1355.00 
    let libraEsterlina = 1604.00
    let euro = 1433.00
    let real = 249.00

    let precioMoneda;
    switch (moneda) {
        case 'dolar':
            precioMoneda = dolar;
            alert(`El precio del ${moneda} es de ${dolar}`);
            break;
        case 'libra':
            precioMoneda = libraEsterlina;
            alert(`El precio de la ${moneda} esterlina es de ${libraEsterlina}`);
            break;
        case 'euro':
            precioMoneda = euro;
            alert(`El precio del ${moneda} es de ${euro}`);
            break;
        case 'real':
            precioMoneda = real;
            alert(`El precio del ${moneda} es de ${real}`);
            break;
        default:
            alert('Moneda no reconocida');
    }
    if (!precioMoneda) {
        i--;
        continue;
    }

    let respuesta = parseInt(prompt('Si desea comprar esta moneda ingrese: 1 \nSi desea salir escriba: 2'));
    if (respuesta == 1) {
        function calcularCompra(precioMoneda) {
            let cantidad = parseFloat(prompt('Ingrese cantidad de pesos'));
            if (!isNaN(cantidad)) {
                let total = cantidad * precioMoneda;
                alert(`El total a pagar en ${moneda} es de ${total}`);
            } else {
                alert('Cantidad ingresada no es valida, ingrese un monto correcto');
            }
        }
        calcularCompra(precioMoneda);
    } else if (respuesta == 2) {
        alert('Gracias por su consulta, vuelva pronto.');
    } else {
        alert('Por favor, seleccione una opcion valida.');
    } 

    operando = parseInt(prompt('Gracias por su compra \nSi desea seguir operando escriba: 1 \nSi desea salir escriba: 2'));
    if (operando == 2) {
        break;
    }
}

if (operando == 2) {
    alert('Gracias por su visita, vuelva pronto.');
}
else {
    alert('No tiene más intentos, vuelva pronto.');
}







