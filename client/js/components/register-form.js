Vue.component('register-form', {
  data() {
    return{
      user: {
        fullname: '',
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    registerUser() {
      let newUser = {
        fullname: this.user.fullname,
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
      }
      axios
        .post(`${baseUrl}/user`, newUser)
        .then(({ data }) => {
          this.$emit('close-register')
          // this.register = false
          this.resetUserForm()
        })
        .catch(err => {
          console.log(err)
        })
    },
    resetUserForm() {
      this.user = {
        fullname: '',
        username: '',
        password: '',
        email: ''
      }
    }
  },
  props: ['register'],
  template: `
    <div id="register-form" class="row">
      <div class="col s12 m8 l4 offset-m2 offset-l4">
        <div class="card">
          <div class="card-content">
            <form v-on:submit.prevent="registerUser">
              <span class="card-title">Register New Account</span>
              <div class="input-field">
                <label for="fullname">Fullname</label>
                <input v-model="user.fullname" type="text" name="fullname">
              </div>
              <div class="input-field">
                <label for="username">Username</label>
                <input v-model="user.username" type="text" name="username">
              </div>
              <div class="input-field">
                <label for="password">Password</label>
                <input v-model="user.password" type="password" name="password">
              </div>
              <div class="input-field">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" name="email">
              </div>
              <div class="form-field center-align">
                <button type="submit" class="btn waves-effect waves-dark ">Register</button>
              </div>
            </form>
            </div>
            <div class="card-content center-align">
            Already have an account? Click <a href="#" v-on:click="$emit('close-register')" >Here.</a>
            </div>
        </div>
      </div>
    </div>
  `
})