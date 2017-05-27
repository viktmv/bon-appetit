//twilio number: (289) 207-1621

const accountSid = 'ACa7450ba6e3ffcc1d1141ed61f18846c6';
const authToken = 'b87d2730c2dc5222410232e5d6cd4b8b';
const client = require('twilio')(accountSid, authToken);

const messageCustomer = (customer, restaurant, time, order_url) => {
const message = `Hello ${(customer)}, your order from ${restaurant} should be ready in ${time} mins! You can check the ETA at ${order_url}.`

  client.messages.create({
    to: "+14162770776",
    from: "+12892071621",
    body: message
  }, (err, message) => {
    if (err) {
      // cb(err);
      return null;
    }
  });
}

const messageComplete = (customer, restaurant, order_url) => {
  const message = `Hello ${(customer)}, your order from ${restaurant} is now ready! You can verify at ${order_url}.`

  client.messages.create({
    to: "+14162770776",
    from: "+12892071621",
    body: message
  }, (err, message) => {
    if (err) {
      // cb(err);
      return null;
    }
  });
}


const callRestaurant = (customer, order, restaurant) => {
  client.calls.create({
    url: `https://handler.twilio.com/twiml/EHd82de43b7027cda1add178f95628fc42?restaurant=${encodeURI(restaurant)}&customer=${encodeURI(customer)}&order=${encodeURI(order)}`,
    to: "+14162770776",
    from: "+12892071621"
  }, function(err, call) {
    if (err) {
      // cb(err);
      return null;
    }
  });
}

module.exports = {
  message: messageCustomer,
  complete: messageComplete,
  call: callRestaurant
};
