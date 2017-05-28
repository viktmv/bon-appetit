$(() => {
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
