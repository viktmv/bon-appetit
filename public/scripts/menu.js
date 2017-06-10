// Handler for dynamic menu-item images on hover
$(() => {
  $(function() {
    $('#img1').hover(
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/1.gif');
      },
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/1f.png');
      }
    );
  });

  $(function() {
    $('#img2').hover(
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/2.gif');
      },
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/2f.png');
      }
    );
  });

  $(function() {
    $('#img3').hover(
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/3.gif');
      },
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/3f.png');
      }
    );
  });

  $(function() {
    $('#img4').hover(
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/4.gif');
      },
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/4f.png');
      }
    );
  });

  $(function() {
    $('#img5').hover(
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/5.gif');
      },
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/5f.png');
      }
    );
  });

  $(function() {
    $('#img6').hover(
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/6.gif');
      },
      function() {
        $(this).attr('src', 'http://www.bangbangicecream.com/flavour/images/6f.png');
      }
    );
  });
});
