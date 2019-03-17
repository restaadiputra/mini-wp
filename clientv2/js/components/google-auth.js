Vue.component('g-signin-button', {
  template: `
    <a ref="signinBtn" class="g-signin2 waves-effect waves-light btn social google"><i class="fa fa-google"></i> Sign in with google</a>
  `,
  mounted() {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init({
        client_id: '867218780944-nl91t85qbdab7sh16dkmn0brt0nn0og0.apps.googleusercontent.com'
      })
      auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
        this.$emit('done', googleUser)
      }, error => console.log(error))
    })
  }
})