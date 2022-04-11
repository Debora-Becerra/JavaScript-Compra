document.addEventListener('DOMContentLoaded', () => {

    // PRODUCTOS
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'ZAPATO BLANCO',
            precio: 7800,
            imagen: './img/zapato-blanco1.jpg'
        },
        {
            id: 2,
            nombre: 'ZAPATILLA VERDE',
            precio: 9000,
            imagen: './img/zapatilla-verde2.jpg'
        },
        {
            id: 3,
            nombre: 'ZAPATILLA DEPORTE',
            precio: 7600,
            imagen: './img/zapatillas-deporte3.jpeg'
        },
        {
            id: 4,
            nombre: 'ZAPATILLAS BLANCAS',
            precio: 8100,
            imagen: './img/zapatillas-blancas4.jpg'
        },
        {
            id: 5,
            nombre: 'ZAPATILLA ROJA',
            precio: 9200,
            imagen: './img/zapatillas-Rojas5.jpg'
        },
        {
            id: 6,
            nombre: 'BORCEGO NEGRO',
            precio: 9500,
            imagen: './img/Botas-Negras6.jpg'
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones

    //Dibuja todos los productos a partir de la base de datos.
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'Añadir al Carrito';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    //Evento para añadir un producto al carrito de la compra
    function anyadirProductoAlCarrito(evento) {
        // Anñadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    //Dibuja todos los productos guardados en el carrito
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = ` ${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    //Evento para borrar un elemento del carrito
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    //Calcula el precio total teniendo en cuenta los productos repetidos
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    //Varia el carrito y vuelve a dibujarlo
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();
    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});

//NOVEDADES -BTN style
var btnAbrirPopup = document.getElementById('btn-abrir-popup'), //acceder al btn para abrir
    overlay = document.getElementById('overlay'), //acceder al overlay
    popup = document.getElementById('popup'),//acceder al popup
    btnCerrarPopup = document.getElementById('btn-cerrar-popup');//acceder boton cerrar

btnAbrirPopup.addEventListener('click', function () { //al precionar btn, agrega clase active
    overlay.classList.add('active');// agrega la clase active
    popup.classList.add('active');//agrega clase active
});

btnCerrarPopup.addEventListener('click', function (e) { //
    e.preventDefault();
    overlay.classList.remove('active'); //Quitamos el active
    popup.classList.remove('active');//quitamos
});

//Novedades--- storage
function guardarDatos() {
    localStorage.nombre = document.getElementById("nombreUsuario").value;
    localStorage.correo = document.getElementById("correoUsuario").value;
}

btnSuscri.addEventListener("click", guardarDatos);

// BOTON CON LIBRERIA
const btnComprar = document.getElementById('boton-comprar');

btnComprar.addEventListener('click', () => {
    Swal.fire({ title: "Gracias por su compra", text: "Imagine que su pedido está en camino.", icon: 'success' })
});
