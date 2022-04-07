const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
//POR CADA BTN UNA FUNCION
addToShoppingCartButtons.forEach((addToCartButton) => {
  //AL HACER CLICK
  addToCartButton.addEventListener('click', addToCartClicked);
});
//BOTON COMPRAR
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);// CUANDO SE HAGA CLICK, EJECUET FUNCION -MENSAJE

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);
//TOMAR LOS PRECIOS DEL HTML
function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');
  //DESCRIP-IMAGEN
  const itemTitle = item.querySelector('.item-title').textContent;
  //PRECIO DEL PRODUCTO -DIV
  const itemPrice = item.querySelector('.item-price').textContent;
  //IMG
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage); //LAS TRES VARIABLES JUNTAS-NOMBRE, PRECIO, IMG
}
//no duplicar el producto--SUMAR CANTIDAD
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName( //RECORRER LOS ITEMS
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) { //COMPROBAR CADA ELEMENTO
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;   //DEL VALOR QE TIENE, LO SUME
      $('.toast').toast('show');
      updateShoppingCartTotal(); //ACTUALIZACION DE PRECIO
      return; //PARA QUE NO SE DUPLIQUE EL ELEMENTO Y SOLO LO SUME
    }
  }
  //AÑADIENDO AL CARRITO
  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  //Alhacer click, toma los elementos -img-titolo-precio
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow //al hacer click, se puede borra el carrito
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow //
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal(); //PRECIO TOTAL +
}
//FUNCION-INDICA QUE EL CARRITO ESTA EN 0 AL INICIAR
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  //FOREACH -POR CADAUNO
  shoppingCartItems.forEach((shoppingCartItem) => {
    //VARIABLEPARA SELECCIONAR EL ELEMENTO
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    //ELEMENTO -SOLO EL PRECIO- CAMBIAMOS DE STRING A NUMBER
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    //VER LA CANTIDAD
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    ); //PASO A NUMERO NUEVAMENTE
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    //TOTAL QUE TENGA + EL PRECIO QUE TENGA * LA CANTIDAD
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  //MOSTRAR EL TOTAL (toFixed=cantidad de digitos)
  shoppingCartTotal.innerHTML = `${total.toFixed(3)}$`;
}
// funcionpara elminar del carrito
function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  //para queno se pueda poner numero negarivo
  input.value <= 0 && (input.value = 1); //ahora usando operador AND
  updateShoppingCartTotal(); //actualizar el precio cada qe añado prodc
}
//AL DAR CLICK ENCOMPRAR, DEBE BORRAR EL CONTENIDO QUE TENIA
function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';//BORRA EL CONTENICO Y PONE CADENA VACIA
  updateShoppingCartTotal(); //BORRA EL PRECIO TOTAL
}

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

