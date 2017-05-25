// Dong - Checks for localStorage. If it doesn't exist, it creates an instance of localStorage
// and returns it. If it does exist, it returns localStorage.
const getCart = () => {
  if (!localStorage.getItem('cart')) {
    const cart = {}
    cart.products = []
    return cart;
  } else {
    return JSON.parse(localStorage.getItem('cart'));
  }
}
// Andrew - Sets localStorage to cart.
const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}
// Andrew - Adds items to cart/localStorage. Updates quantity if item is already in cart.
const addItem = (id, name, price, img) => {
  let cart = getCart();
  let matchingProduct = cart.products.findIndex((product) => {
    return product.item_id === id;
  })
  if (matchingProduct === -1) {
    const product = {};
    product.item_id = id;
    product.name = name;
    product.price = price;
    product.image_url = img;
    product.quantity = 1;
    cart.products.push(product)
  } else {
    cart.products[matchingProduct].quantity += 1;
  }
  setCart(cart)
}
