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

