$(() => {
  $.ajax({
    method: "GET",
    url: "/restaurants"
  }).done((restaurants) => {
    for(restaurant of restaurants) {
      $("<div>").text(restaurant.name).appendTo($("body"));
    }
  });;
});
