$(document).ready(function () {
  let isEmpty = false;

  $('.txt-input').on('input blur', function() {
    let chars = $(this).val();

    if (!chars.trim()) {
      isEmpty = true;
    } else {
      isEmpty = false;
    }
  });


  $('.oid').on('submit', function(event) {
    event.stopPropagation();
    event.preventDefault();
    let form = this
    let id = $(this).data('id');
    let val = Number($(this).find('.txt-input').val());

    const timeData = {
      id: id,
      val: val
    };

    if (isEmpty) return;

    $.ajax(`/restaurants/order_status/${timeData.id}`, {
      method: 'post',
      data: timeData
    })
    .then(function() {
      $(form).find('.txt-input').prop('readonly', true);
      $(form).find('button').prop('disabled', 'true').text('Accepted');
    })
    .fail(function(error) {
      console.error(error);
    });
    return;
  });

  $('.done').on('submit', function(event) {
    event.stopPropagation();
    event.preventDefault();

    let id = $(this).data('id');
    let done = true;
    let notDone =false;

    const status = {
      id: id,
      done: done,
      notDone: notDone
    };

    let form = this
    $.ajax(`/restaurants/done/${id}`, {
      method: 'post',
      data: status
    })
      .then(function() {
        $(form).find('button').prop('disabled', 'true');
        $(form).closest('.container-fluid.sub-table').remove()
      })
      .fail(function(error) {
        console.error(error);
      });
    return
  });
});
