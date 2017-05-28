exports.seed = function(knex, Promise) {
//get the id in restaurant table
function getId() {
  return knex('restaurant')
    .select('id')
    .where('name', 'like', 'S%');
}

function getUId(char) {
  return knex('users')
    .select('id')
    .where('first_name', '=', char);
}

function getOId(price) {
  return knex('orders')
    .select('id')
    .where('total_price', '=', price);
}

function getPId(name) {
  return knex('foods')
    .select('id')
    .where('name', '=', name);
}

// Deletes ALL existing entries
return knex('food_orders').del()
  .then(function() {
    return knex('foods').del()
  }).then(function() {
    return knex('orders').del()
  }).then(function() {
    return knex('restaurant').del()
  }).then(function() {
    return knex('users').del()
    //seed the restaurant table
  }).then(function() {
    return knex('restaurant').insert({
      name: 'Ice Scream!',
      restaname: 'icecream',
      password: 'pass'
    });
    //seed products table
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'Burnt Toffee',
      description: 'Salted Butter Carmel.',
      price: 6.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/1f.png',
      image_id: 'img1'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'London Fog',
      description: 'Made with Earl Grey tea and vanilla, giving it a distinct black tea flavor while still being bright, floral and creamy.',
      price: 6.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/2f.png',
      image_id: 'img2'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'Totaro',
      description: 'Sweet, starchy, light and nutty.',
      price: 6.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/3f.png',
      image_id: 'img3'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'Fresh Mint',
      description: 'We are MINT for each other.',
      price: 6.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/4f.png',
      image_id: 'img4'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'Cinnamon Toast',
      description: 'Butter, brown sugar & ground cinnamon.',
      price: 6.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/5f.png',
      image_id: 'img5'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'Thank You Very Matcha',
      description: 'Green Tea.',
      price: 6.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/6f.png',
      image_id: 'img6'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'RoCocoa',
      description: 'Cocoa brut, 70% callebaut chocolate, maldon salt.',
      price: 4.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/1.png',
      image_id: 'img7'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'Captain P\'nut.',
      description: 'Cara-melly & crunchy. Salted Virginia Peanut Brittle.',
      price: 4.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/2.png',
      image_id: 'img8'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'A likkle bit of everything.',
      description: 'Two kinds of chocolate, pretzels, peanut butter & oatmeal.',
      price: 4.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/3.png',
      image_id: 'img9'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'Go girl, it\'s your birthday.',
      description: 'Lemon zest with a sweet & salty birthday crumb.',
      price: 4.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/4.png',
      image_id: 'img10'
    });
  }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'Oatmeal.',
      description: 'Two kinds of raisins, on a date.',
      price: 4.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/6.png',
      image_id: 'img11'
    });
  }).then(function() {
      return knex('foods').insert({
        restaurant_id: getId(),
        name: 'Ginger.',
        description: 'aka Ed Sheeran. Spicy & chewy with molasses.',
        price: 4.99,
        image_url: 'http://www.bangbangicecream.com/flavour/images/8.png',
        image_id: 'img12'
      });
    }).then(function() {
    return knex('foods').insert({
      restaurant_id: getId(),
      name: 'Vegan.',
      description: 'Gluten free with flour, oats and dark chocolate.',
      price: 4.99,
      image_url: 'http://www.bangbangicecream.com/flavour/images/9.png',
      image_id: 'img13'
    });

//seed users table
}).then(function() {
  return knex('users').insert({
    first_name: 'Dong',
    last_name: 'Hu',
    phone: '14162770776',
    username: 'dong',
    email: '',
    password: 'password'
  });
}).then(function() {
  return knex('users').insert({
    first_name: 'Viktor',
    last_name: 'M',
    phone: '15555555555',
    username: 'viktmv',
    email: 'viktmv@icloud.com',
    password: 'password'
  });
}).then(function() {
  return knex('users').insert({
    first_name: 'Karun',
    last_name: 'A',
    phone: '13333333333',
    username: 'karun',
    email: '',
    password: 'password'
  });
  //seed orders table
});
};
