$(() => {
  $('.more-details').click(function() {
    $(this).closest('.top-item').find('.extra-details').slideToggle(200);
  });
});
