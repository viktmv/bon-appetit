// Checks for localStorage. If it doesn't exist, it creates an instance of localStorage
// and returns it. If it does exist, it returns localStorage.
const getCart = () => {
  if (!localStorage.getItem('cart')) {
    const cart = {};
    cart.foods= [];
    return cart;
  } else {
    return JSON.parse(localStorage.getItem('cart'));
  }
};
// Sets localStorage to cart.
const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};
// Adds items to cart/localStorage. Updates quantity if item is already in cart.
const addItem = (id, name, price, img) => {
  let cart = getCart();
  let matchingProduct = cart.foods.findIndex((food) => {
    return food.item_id === id;
  });
  if (matchingProduct === -1) {
    const food = {};
    food.item_id = id;
    food.name = name;
    food.price = price;
    food.image_url = img;
    food.quantity = 1;
    cart.foods.push(food);
  } else {
    cart.foods[matchingProduct].quantity += 1;
  }
  setCart(cart);
};

$(() => {
  $('#shopping-cart').text(' 0');
  const cart = {};
  cart.foods = [];

  let cartItemCount = 0;

  $('.add-item').on('click', (e) => {

    let element = $(e.target);
    let item = element.closest('#item-details');
    cartItemCount += 1;

    $('#shopping-cart').text(' ' + cartItemCount);
    addItem(item.data('id'), item.data('name'), item.data('price'), item.data('image-url'));
  });

  // On order submission, user's localStorage is sent as an object on post request to the server.
  $('#checkout').on('submit', (e) => {
    e.preventDefault();
    let $cart = JSON.stringify(getCart());
    $.post({
      url: '/users/order',
      data: {
        'cart': $cart
      },
      success:(data) => {
        // Takes the url from the data response from post request and renders users/:orderID
        window.location.replace(data.url);
        localStorage.clear();
      }
    });
  });

  // Logic for Subtotal
  const roundMoney = (number) => {
    number = (Math.round(number * 100) / 100);
    return number;
  };

  const createSubtotal = () => {
    let subTotal = 0;
    const cartItems = localStorage.getItem('cart');
    if (cartItems) {
      let foods = JSON.parse(cartItems).foods;
      for (let item in foods) {
        subTotal += foods[item].price * foods[item].quantity;
      }
    }
    return subTotal;
  };

  createSubtotal();

  if (createSubtotal() == 0) {
    $('.total-amount').append(0);
  } else {
    $('.total-amount').append(roundMoney(createSubtotal() * 1.13).toFixed(2));
  }
});
