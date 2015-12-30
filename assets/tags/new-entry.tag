<new-entry>
  <form method="post" onsubmit="{create}">
    <textarea name="text"></textarea>
    <input type="submit"/>
  </form>

  <script>
    var self = this;
    var xhr = opts.xhr;
    var page = opts.page;
    this.create = function(e){
      e.preventDefault();
      xhr.post('/new')
        .type('application/json')
        .accept('application/json')
        .send({text: self.text.value})
        .end().then(function (response){
          page.replace('/entry/' + response.body.id, {text: self.text.value});
        }
      );
    }
  </script>
</new-entry>