$(() => {
  $.ajax({
    method: 'GET',
    url: '/api/users'
  }).done((users) => {
    for(user of users) {
      $('<div>').text(user.name).appendTo($('body'));
    }
  });


  $.ajax({
    method: 'GET',
    url: '/users/:id'
  }).done((restaurants) => {
    for(rest of restaurants) {
      $('<div>').text(rest.name).appendTo($('body'))
    }
  })

  $.ajax({
  })
});
