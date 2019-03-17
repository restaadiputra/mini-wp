Vue.component('login-form', {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signInGoogle(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      
      axios
        .post(`${baseUrl}/signin/google`, { id_token })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('fullname', data.fullname)
          this.$emit('sign-in')
        })
        .catch(err => {
          console.log(err)
        })
    },
    signInLocal() {
      let user = {
        username: this.user.username,
        password: this.user.password
      }
      axios
        .post(`${baseUrl}/signin/local`, user)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('fullname', data.fullname)
          this.$emit('sign-in')
        })
        .catch(err => {
          console.log(err)
        })
    }
    
  },
  props: ['register'],
  template: `
    <div id="signin-form" class="row">
      <div class="col s12 m8 l4 offset-m2 offset-l4">
        <div class="card">
          <div class="card-content">
            <form v-on:submit.prevent="signInLocal">
              <span class="card-title">Sign In to Your Account</span>
              <div class="form-field">
                <label for="username">Username</label>
                <input v-model="user.username" type="text" name="username">
              </div>
              <div class="form-field">
                <label for="password">Password</label>
                <input v-model="user.password" type="password" name="password">
              </div>
              <div class="form-field center-align">
                <button type="submit" class="btn waves-effect waves-dark">Sign In</button>
              </div>
            </form>
            <br>
            <div class="center-align">
              Not registered?
              <a href="#" v-on:click="$emit('close-register')" >Create an account.</a>
              <hr>
              or use register using social media
              <br>
              <g-signin-button v-on:done="signInGoogle"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})