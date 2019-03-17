Vue.component('header-dashboard', {
  methods: {
    signOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('fullname')
      this.$emit('sign-out')
    }
  },
  props: ['fullname'],
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
      <li><a class="white-text"><i class="material-icons white-text">dashboard</i>Dashboard</a></li>
      <li><a href="#!" class="white-text"><i class="material-icons white-text">list</i>View All Article</a></li>
      <li><a href="#!" class="white-text"><i class="material-icons white-text">insert_drive_file</i>Create New Article</a></li>
    </ul>
  </header>
  `
})