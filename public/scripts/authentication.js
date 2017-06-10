$(() => {
  // Login landler
  $('#loginForm').on('submit', function(e) {
    e.preventDefault();

    let username = $('#username').val();
    let password = $('#pwd').val();

    $.ajax('/login', {
      method: 'POST',
      data: { username, password }
    })
    .done((data) => { if (data.length > 0) window.location.reload(); })
    .fail(err => console.log(err));
  });
  // Logout handler
  $('#logout-btn').on('click', function(e) {
    e.preventDefault();

    $.ajax('/logout', {
      method: 'POST',
    }).done(() => {
      window.location.reload();
    });
  });

  // Landler for the restaurant login
  $('.restaurant-auth').on('submit', function(e) {
    e.preventDefault();

    let restaname = $('#restaname').val();
    let password = $('#pwd').val();

    $.ajax('/restaurants/login', {
      method: 'POST',
      data: { restaname, password }
    })
    .done((data) => { if (data.length > 0) window.location = '/restaurants/order_status'; })
    .fail(err => console.log(err));
  });
});
