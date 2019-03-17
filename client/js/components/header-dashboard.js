Vue.component('header-dashboard', {
  methods: {
    signOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('fullname')
      this.$emit('sign-out')
    }
  },
  props: ['fullname'],
  mounted() {
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
  },
  template: `
  <header>
    <nav class="blue-grey darken-4">
      <a data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>

      <ul class="right">
        <li><a>{{ fullname }}</a></li>
        <li>
          <a class="dropdown-trigger" href="#!" data-target="dropdown1">Option
            <i class="material-icons right">arrow_drop_down</i>
          </a>
        </li>
      </ul>

    </nav>
    <ul id="dropdown1" class="dropdown-content blue-grey darken-4">
      <li><a class="white-text" href="" v-on:click="signOut">Logout</a></li>
    </ul>

    <ul id="slide-out" class="sidenav sidenav-fixed blue-grey darken-4">
      <li><a class="white-text sidenav-close" v-on:click="$emit('change-page', 'dashboard')"><i class="material-icons white-text">dashboard</i>Dashboard</a></li>
      <li><a href="#!" class="white-text sidenav-close" v-on:click="$emit('change-page', 'list')"><i class="material-icons white-text">list</i>View All Article</a></li>
      <li><a href="#!" class="white-text sidenav-close" v-on:click="$emit('change-page', 'editor')"><i class="material-icons white-text">insert_drive_file</i>Create New Article</a></li>
    </ul>
  </header>
  `
})