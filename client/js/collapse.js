document.addEventListener('DOMContentLoaded', function() {
  var sidenav = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(sidenav, {
      menuWidth: 100, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens,
    })

  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances2 = M.Dropdown.init(elems, {
    constrainWidth: false,
    coverTrigger: false,
    alignment: 'right',
    hover: true
  });
});