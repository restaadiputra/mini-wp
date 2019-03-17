const baseUrl = 'http://localhost:3000';
const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''; 

let app = new Vue({
  el: '#app',
  data: {
    user: {
      fullname: localStorage.getItem('fullname')
    },
    article: {
      id: '',
      title: '',
      content: '',
      created_at: '',
      updated_at: '',
      featured_image: '',
      status: 'new'
    },
    articles: [],
    dashboard: localStorage.getItem('token') ?
    true : false,
    register: true,
  },
  methods: {
    getArticles() {
      this.articles = []
      axios
        .get(`${baseUrl}/article/user`, { headers: { token } })
        .then(({ data }) => {
          if(data.length > data) {
            for(index in data) {
              this.articles.push(data[index])
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }, 
    closeRegister() {
      this.register = !this.register;
    },
    signOut() {
      this.dashboard = false;
    },
    sighIn() {
      this.dashboard = true;
    }
  }
})