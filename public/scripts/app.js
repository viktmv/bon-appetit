$(() => {
  $.ajax({
    method: 'GET',
    url: '/'
  }).done((restaurants) => {
    for(rest of restaurants) {
      $('<div>').text(rest.name).appendTo($('body'));
    }
  });


