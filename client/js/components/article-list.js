Vue.component('article-list', {
  data() {
    return {
      search: '',
      temp_article: {
        id: '',
        title: '',
        content: '',
        created_at: '',
        updated_at: '',
        featured_image: ''
      }
    }
  },
  props: ['articles'],
  methods: {
    timeAgo: function(second) {
      let seconds = Math.floor((new Date(Date.now()) - new Date(second)) / 1000);
      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        return `${interval} year${interval === 1 ? '': 's'} ago`;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        return `${interval} month${interval === 1 ? '': 's'} ago`;
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return `${interval} day${interval === 1 ? '': 's'} ago`;
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return `${interval} hour${interval === 1 ? '': 's'} ago`;
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return `${interval} minute${interval === 1 ? '': 's'} ago`;
      }
      if (!!!+seconds || seconds < 30) {
        return "a moment ago";
      }
      return Math.floor(seconds) + " seconds ago";
    },
    deleteArticle(id) {
      const token = localStorage.getItem('token');
      axios
        .delete(`${baseUrl}/article/${id}`, { headers: { token } })
        .then(({ data }) => {
          M.toast({html: 'Delete One Article'})
          this.$emit('remove', data)
        })
    },
    getArticles() {
      const token = localStorage.getItem('token');
      axios
        .get(`${baseUrl}/article/user${this.search !== '' ? `?title=${this.search}` : ''}`, { headers: { token } })
        .then(({ data }) => {
          this.$emit('filter-article', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showDetailArticle(id) {    
      const token = localStorage.getItem('token');  
      axios
        .get(`${baseUrl}/article/${id}`, { headers: { token } })
        .then(({ data }) => {
          this.temp_article.id = data._id
          this.temp_article.title = data.title
          this.temp_article.content = data.content
          this.temp_article.created_at = data.created_at
          this.temp_article.updated_at = data.updated_at
          this.temp_article.featured_image = data.featured_image
        })
    },
  },
  
  
  mounted() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  },
  template: `
    <div id="article-list" class="container">
      <div class="row">
        <div class="col s6">
          <h3>Articles</h3>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">search</i>
          <input v-model="search" v-on:keypress.13.prevent="getArticles" id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">Search...</label>
        </div>
        
        <div class="col s12">
          <p><b>All({{ articles.length }})</b></p>
          <ul class="collection">
            <div class="">
              <li class="collection-item blue-grey lighten-5 z-depth-2">
                <div class="row">
                  <div class="col s3"><b>Title</b></div>
                  <div class="col s3"><b>Preview</b></div>
                  <div class="col s2"><b>Created At</b></div>
                  <div class="col s2"><b>Last Update</b></div>
                  <div class="col s2"><b>Option</b></div>
                </div>
              </li>
            </div>

            <li class="collection-item" v-for="article in articles">
              <div class="row">
                <div class="col s3"><a href="#" v-on:click="$emit('show-detail-article', article._id)">{{ article.title }}</a></div>
                <div class="col s3"><a v-on:click="showDetailArticle(article._id)" class="waves-effect waves-light btn modal-trigger" href="#modal1">Preview</a></div>
                <div class="col s2">{{ timeAgo(article.created_at) }}</div>
                <div class="col s2">{{ timeAgo(article.updated_at) }}</div>
                <div class="col s2"><button v-on:click="deleteArticle(article._id)" class="btn red"><i class="material-icons left">delete</i></button></div>
              </div>
            </li>
          </ul> 
          
            <div id="modal1" class="modal">
              <div class="modal-content">
                <img class="responsive-img" v-bind:src="temp_article.featured_image" /> 
                <h3 class="center-align">{{ temp_article.title }}</h3>
                <p v-html="temp_article.content"></p>
              </div>
              <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
              </div>
            </div>
          </div>

      </div>
      
    </div>
  `
})

// var modals = document.querySelectorAll('.modal');
// var instances3 = M.Modal.init(modals);