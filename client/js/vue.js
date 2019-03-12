const baseUrl = 'http://localhost:3000'

// Article
let app = new Vue({
  el: '#app',
  data: {
    user: {
      fullname: '',
      username: '',
      password: '',
      email: '',

    },
    article: {
      id: '',
      title: '',
      content: '',
      status: true
    },
    articles: [],
    login: localStorage.getItem('token') ? false : true,
    dashboard: localStorage.getItem('token') ? true : false,
    register: false,
    list: false,
    editor: false
  }, 
  methods: {
    getLoginState() {
      if(localStorage.getItem('token')) {
        dashboard = true
        login = false
      } else {
        dashboard = false
        login = true
      }
    },
    getEditor(status) {
      if(!this.editor) {
        this.editor = true;
        this.list = false
      }
      this.article.status = status
      
      if(status) {
        this.resetEditorForm()
      }
    },
    getArticles() {
      this.articles = []
      if(!this.list) {
        this.editor = false;
        this.list = true
      }

      let token = localStorage.getItem('token');
      axios
        .get(`${baseUrl}/article/user`, {headers: { token }})
        .then(({ data }) => {
          if(data.length > 0) {
            for(index in data) {
              this.articles.push(data[index])
            }
          }
        })
    },
    resetEditorForm() {
      this.article.id = ''
      this.article.title = ''
      this.article.content = ''
    },
    signin() {
      let user = {
        username: this.user.username,
        password: this.user.password
      }
      axios
        .post(`${baseUrl}/signin`, user)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('fullname', data.fullname)
          this.dashboard = true
          this.login= false
        })
        
    },
    signout() {
      localStorage.removeItem('token');
      localStorage.removeItem('fullname');
      this.dashboard = false
      this.login= true
    },
    showDetailArticle(id) {
      this.article.status = true
      let token = localStorage.getItem('token');
      axios
        .get(`${baseUrl}/article/${id}`, { headers: { token } })
        .then(({ data }) => {
          this.article.id = data._id
          this.article.title = data.title
          this.article.content = data.content
          this.getEditor(false)
        })
    },
    createArticle() {
      let newArticle = {
        title: this.article.title,
        content: this.article.content
      }

      let token = localStorage.getItem('token');
      axios
        .post(`${baseUrl}/article`, newArticle, { headers: { token } })
        .then(({ data }) => {
          this.getArticles()
          this.resetEditorForm()
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateArticle() {
      let updatedArticle = {
        title: this.article.title,
        content: this.article.content
      }
      let token = localStorage.getItem('token');
      axios
        .put(`${baseUrl}/article/${this.article.id}`, updatedArticle, { headers: { token } })
        .then(({ data }) => {
          let index = this.articles.findIndex((e) => e.id === data.id)
          this.articles.splice(index, 1, data)
          this.resetEditorForm()
          this.editor = false;
          this.list = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    
    postArticle() {
      if(this.article.status) {
        this.createArticle()
      } else {
        this.updateArticle()
      }
    },
    deleteArticle(id) {
      let token = localStorage.getItem('token');
      axios
        .delete(`${baseUrl}/article/${id}`, { headers: { token } })
        .then(({ data }) => {
          let index = this.articles.findIndex((e) => e.id === data.id)
          this.articles.splice(index, 1)
          this.resetEditorForm()
          this.editor = false;
          this.list = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    filterByName({ target }) {
      this.articles = []
      if(!this.list) {
        this.editor = false;
        this.list = true
      }

      let token = localStorage.getItem('token');
      axios
        .get(`${baseUrl}/article/user?title=${target.value}`, {headers: { token }})
        .then(({ data }) => {
          for(index in data) {
            this.articles.push(data[index])
          }
        })
    },

    switchForm(status) {
      if(status) {
        this.register = true
        this.login = false
      } else {
        this.register = false
        this.login = true
      }
    },
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
          this.register = false
          this.login = true
          for(e in this.user) {
            e = ''
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

app.getArticles()