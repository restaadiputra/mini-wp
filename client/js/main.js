$('document').ready(function() {
  $("#menu-toggle-header").hide()
  $('#dark-mode').hide()
  $("#menu-toggle-header").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#menu-toggle-header").hide()
  });

  $("#menu-toggle-menu").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $('#menu-toggle-header').show()
  });
})

