$('document').ready(function() {
  $("#menu-toggle-header").hide()
  $('#dark-mode').hide()
  $("#menu-toggle-header").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#menu-toggle-header").hide()
  });

  $("#menu-toggle-menu").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $('#menu-toggle-header').show()
  });
})


function showForm() {
  $('#main-content')
    .html('')
  let html = `
    <label for="Article Title">Title</label>
        <input type="text" class="form-control" placeholder="Your Title" style="font-weight:bold">
    <br>
    <div id="froala-editor">
        <p></p>
    </div>
    <br/>
    <div id="preview" class="fr-view">
        <p id="article-content"></p>
    </div>
    <button class="btn btn-danger">SUBMIT</button>
  `
  
  $('#main-content')
    .html(html)
  $('div#froala-editor')
    .froalaEditor()
    .on('froalaEditor.contentChanged', function (e, editor) {
      $('#preview').html(editor.html.get());
    })
}

function showArticle() {
  $('#main-content')
    .html(`
      <div id="list-content" class="row">
        <div class="col-sm-12 d-flex">
          <h3>Content List</h3>
          <input class="form-control ml-auto mt-2 mt-lg-0" type="text" placeholder="Search" aria-label="Search">
        </div>

        <div id class="col-sm-12">
          <p><b>All</b>12</p>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6">
                  Title
                </div>
                <div class="col-sm-2">
                  Created At
                </div>
                <div class="col-sm-2">
                  Last Update
                </div>
                <div class="col-sm-2">
                  Option
                </div>
              </div>
            </div>

            <!-- Articles List -->
            <div class="card-body border" v-for="article in articles">
              <div class=" row">
                <div class="col-sm-6">
                  <a href="#">{{ article.title }}</a>
                </div>
                <div class="col-sm-2">{{ article.created_at }}</div>
                <div class="col-sm-2">{{ article.created_at }}</div>
                <div class="col-sm-2">
                  <a href="#" class="text-danger"><i class="fas fa-trash-alt"></i>Delete</a>
                </div>
              </div>
            </div>
            <!-- Articles List -->
          </div>
        </div>
      </div>
    `)
}

function darkMode() {
  $('body').addClass('bg-dark text-white');
  $('#sidebar-wrapper').addClass('bg-dark text-white');
  $('#header').addClass('navbar-dark bg-dark')
  $('#white-mode').show()
  $('#dark-mode').hide()
}

function whiteMode() {
  $('body').addClass('bg-light text-dark');
  $('#sidebar-wrapper').addClass('bg-light text-dark');
  $('#header').addClass('navbar-light bg-light')
  $('#white-mode').hide()
  $('#dark-mode').show()
}

