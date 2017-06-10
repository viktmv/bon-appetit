// File with helper functions and event handlers for cart
const deleteCartItem = (id) => {
  let cart = getCart();
  let matchingProduct = cart.foods.findIndex((food) => {
    return food.item_id === id;
  });
  cart.foods.splice(matchingProduct, 1);
  setCart(cart);
};

const editCart = (id, quantity) => {
  let cart = getCart();
  let matchingProduct = cart.foods.findIndex((food) => {
    return food.item_id === id;
  });
  // If new quantity is > 0, quantity will be updated
  if (quantity > 0) {
    cart.foods[matchingProduct].quantity = quantity;
    // Deletes item if quantity === 0
  } else {
    cart.foods.splice(matchingProduct, 1);
  }
  setCart(cart);
};

const roundMoney = (number) => {
  number = (Math.round(number * 100) / 100);
  return number;
};

const createCartItem = (cartItem) => {
  const $item = $(`
    <div class="row" id="cart-item">
      <div class="item-image">
        <img class="img-responsive" src="${cartItem.image_url}" width=150 height=150>
      </div>
      <div class="">
        <ul class="item-info">
          <li class="item-name">${cartItem.name}</li>
          <li class="item-price">$${cartItem.price}</li>
        </ul>
      </div>
      <div class="item-controls">
        <ul class="adjust-item">
          <li>
            <input type="button" class="delete-item" value="Remove" data-id="${cartItem.item_id}"></input>
          </li>
          <li>
            x<input class="edit-item-quantity" data-id="${cartItem.item_id}" type="number" class="form-control text-center" value="${cartItem.quantity}"></input>
          </li>
        </ul>
      </div>
      <div class="text-right">
        <span>Item-total:</span>
        <span class="item-subtotal">$${roundMoney(cartItem.price * cartItem.quantity)}</span>
      </div>
    </div>
    `);
  return $item;
};

const createSubtotal = () => {
  subTotal = 0;
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) return document.querySelector('#order-submit').disabled = true;
  else document.querySelector('#order-submit').disabled = false;
  const cartItems = cart.foods;

  for (let item in cartItems) {
    subTotal += roundMoney(cartItems[item].price * cartItems[item].quantity);
  }
  return subTotal;
};

const clearTotal = () =>{
  $('.empty-notice').remove();
  $('.totals').remove();
};
const renderTotals = () => {
  createSubtotal();

  const tax = subTotal * 0.13;
  const total = subTotal + tax;

  $('.order-wrapper').append(`
    <div class="row totals">
    <div class="col-12 text-right">
    <p>Subtotal: $${roundMoney(subTotal).toFixed(2)}</p>
    <p>Tax: $${roundMoney(tax).toFixed(2)}</p>
    <p>Total: $${roundMoney(total).toFixed(2)}</p>
    </div>
    </div>
    `);
};
let notice = `
  <div class="row empty-notice">
  <div class="col-12 text-center">
  Please select an item from the <a href="/users/menu">menu</a>.
  </div>
  </div>
  `;
const displayCartItems = () => {
  $('.order-wrapper').html('');
  if (localStorage.getItem('cart') === null || JSON.parse(localStorage.getItem('cart')).foods.length === 0) {

    if ($('.empty-notice').length === 0) {
      $('.order-wrapper').append(notice);
    }
    $('.totals').remove();
  } else {

    $('.empty-notice').remove();
    const cartItems = JSON.parse(localStorage.getItem('cart')).foods;

    for (let item in cartItems) {
      $('.order-wrapper').append(createCartItem(cartItems[item]));
    }

    $('.order-wrapper .add-item').on('click', () => {
      $('.total-amount').html('').append(roundMoney(createSubtotal() * 1.13).toFixed(2));
    });

    $('.order-wrapper .delete-item').on('click', (e) => {
      let id = $(e.target).data('id');
      // Remove item from cart and then call deleteCartItem function.
      $(e.target).closest('#cart-item').remove();
      deleteCartItem(id);

      $('.totals').remove();

      renderTotals();

      $('.total-amount').html('').append(roundMoney(createSubtotal() * 1.13).toFixed(2));
    });

    $('.order-wrapper .edit-item-quantity').on('change', (e) => {
      let quantity = $(e.target).val();

      if (quantity < 1) $(e.target).parents('div#cart-item.row').remove();

      let price = Number($(e.target).parents('div#cart-item.row').find('.item-price').html().slice(1));
      let item = $(e.target).closest('.edit-item-quantity');
      editCart(item.data('id'), quantity);

      let newPrice = '$' + roundMoney(quantity * price);

      $(e.target).parents('div#cart-item.row').find('.item-subtotal').html(newPrice);

      $('.total-amount').html('').append(roundMoney(createSubtotal() * 1.13).toFixed(2));
      $('.totals').remove();

      renderTotals();

    });
  }
};

// Set up display handlers
$(() => {
  $('.partial-cart').hide();

  $('.close-btn').click(function() {
    $(this).closest('.partial-cart').hide();
  });

  $('#footer .checkout .toggle-cart').click(function() {
    $('.partial-cart').show();
    displayCartItems();
    renderTotals();
  });

  $('.back').click(e => {
    e.preventDefault();
    $('.partial-cart').hide();
  });

  $('.partial-cart').click(function(e) {
    let cart = document.querySelector('.partial-cart');
    if (e.target.contains(cart)) $('.partial-cart').hide();
  });

  $('.add-item').on('click', () => {
    $('.total-amount').html('').append(roundMoney(createSubtotal() * 1.13).toFixed(2));
  });
});
