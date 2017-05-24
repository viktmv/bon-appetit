$(() => {
  // $.ajax({
  //   method: 'GET',
  //   url: '/api/users'
  // }).done(users => {
  //   for (var user of users) {
  //     $('<div>').text(user.name).appendTo($('body'));
  //   }
  // })

  $.ajax({
    method: 'GET',
    url: '/restaurants'
  }).done(restaurants => {
    for(var restaurant of restaurants) {
      $('<div>').text(restaurant.name).appendTo($('body'));
    }
  })
})
