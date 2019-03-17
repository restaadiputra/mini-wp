const baseUrl = 'http://localhost:3000';
const token = localStorage.getItem('token');

let app = new Vue({
  el: '#app',
  data: {
    user: {
      fullname: localStorage.getItem('fullname')
    },
    load: false,
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
    dashboard: localStorage.getItem('token') ? true : false,
    page: 'dashboard',
    editor: false,
    register: true,
  },
  methods: {
    getArticles() {
      const token = localStorage.getItem('token');
      this.articles = []
      axios
        .get(`${baseUrl}/article/user`, { headers: { token } })
        .then(({ data }) => {
          if(data.length > 0) {
            for(index in data) {
              this.articles.push(data[index])
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    filterArticle(data) {
      console.log(data)
      this.articles = []
      if(data.length > 0) {
        for(index in data) {
          this.articles.push(data[index])
        }
      }
    },
    showDetailArticle(id) {   
      const token = localStorage.getItem('token');   
      axios
        .get(`${baseUrl}/article/${id}`, { headers: { token } })
        .then(({ data }) => {
          this.article.id = data._id
          this.article.title = data.title
          this.article.content = data.content
          this.article.created_at = data.created_at
          this.article.updated_at = data.updated_at
          this.article.featured_image = data.featured_image
          this.article.status = 'edit'
          this.page = 'editor'
        })
    },
    closeRegister() {
      this.register = !this.register;
    },
    signOut() {
      this.dashboard = false;
      this.resetArticle()
      this.resetArticles()
    },
    sighIn() {
      this.dashboard = true;
      this.getArticles()
      this.resetArticle()
      this.user.fullname = localStorage.getItem('fullname')
    },
    changePage(page) {
      this.page = page
      this.resetArticle()
      if(page === 'list') {
        this.getArticles() 
      }
    },
    loadingFinish([data, status = null]) {
      if(status === 'new') {
        this.articles.push(data)
      } else {
        let index = this.articles.findIndex(e => e._id ===data._id);
        this.articles.splice(index, 1, data)
      }

      this.resetArticle()
      this.page = 'list'
    },
    removeArticle(data) {
      let index = this.articles.findIndex(e => e._id ===data._id);
      this.articles.splice(index, 1)
    },
    resetArticles() {
      this.articles = []
    },
    resetArticle() {
      this.article = {
        id: '',
        title: '',
        content: '',
        created_at: '',
        updated_at: '',
        featured_image: '',
        status: 'new'
      }
    }
  }
})
