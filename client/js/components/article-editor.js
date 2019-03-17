Vue.component('article-editor', {
  data() {
    return {
      image: ''
    }
  },
 
  props: ['article'],
  methods: {
    handleFileUpload() {
      this.image = this.$refs.file.files[0];
    },
    postArticle() {
      M.toast({html: 'Saving .....'})
      if(this.article.status === 'new') {
        this.createArticle()
      } else if(this.article.status === 'edit') {
        this.updateArticle()
      }
    },
    createArticle() {
      const token = localStorage.getItem('token');
  
      const newArticle = new FormData();
      newArticle.append('title', this.article.title);
      newArticle.append('content', this.article.content)
      newArticle.append('image', this.image)

      axios
        .post(`${baseUrl}/article`, newArticle, { 
          headers: { 
            'Content-Type': 'multipart/form-data',
            token: token
          }
        })
        .then(({ data }) => {
          M.toast({html: 'Done!'})
          this.$emit('finish', [data, 'new'])
        })
        .catch(err => {
          M.toast({html: 'Something wrong, please check your connection.'})
          this.$emit('change-page', 'list')
        })
    },
    updateArticle() {
      const token = localStorage.getItem('token');
      const newArticle = new FormData();
      newArticle.append('title', this.article.title);
      newArticle.append('content', this.article.content)
      newArticle.append('image', this.image)

      axios
        .put(`${baseUrl}/article/${this.article.id}`, newArticle, { 
          headers: { 
            'Content-Type': 'multipart/form-data',
            token
          }
        })
        .then(({ data }) => {
          M.toast({html: 'Done!'})
          this.$emit('finish', [data, 'edit'])
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  
  template: `
  <div class="container">
    <div class="row">
    <h3>{{ this.article.status === 'new' ? 'New Article' : 'Edit Article' }}</h3>
    <form enctype="multipart/form-data" v-on:submit.prevent="postArticle">
      
      <div class="file-field input-field">
        <div class="btn">
          <span>Featured Image</span>
          <input type="file" @change.prevent="handleFileUpload" id="file" ref="file">
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>
      </div>
        <div class="input-field col s12">
        <input v-model="article.title" placeholder="Title" type="text" minlength="5">
      </div>
      <ckeditor v-model="article.content"></ckeditor>
      
      <div class="input-field">
        <button type="submit" class="btn waves-effect waves-dark ">
        {{ this.article.status === 'new' ? 'Create' : 'Edit' }}
        </button>
        </div>
        </form>
        <button v-on:click="$emit('change-page', 'list')" class="btn red waves-effect waves-dark ">Cancel</button>
    </div>
  </div>
  `
})