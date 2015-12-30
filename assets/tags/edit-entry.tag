<edit-entry>
  <form method="post" action="/entry" onsubmit="{edit}">
    <input type="hidden" name="id" value="{opts.entry.id}"/>
    <textarea name="text">{opts.entry.text}</textarea>
    <input type="submit"/>
  </form>

  <script>
    var self = this;
    var xhr = opts.xhr;
    var page = opts.page;
    if(opts.entry.id && !opts.entry.text){
      xhr.get('/entry/' + opts.entry.id).accept('application/json').then(function (response){
        opts.entry = response.body;
        self.update();
      });
    }
    this.edit = function(e){
      console.log('HERE')
      e.preventDefault();
      var data = {id: opts.entry.id, text: self.text.value};
      xhr.put('/entry')
        .type('application/json')
        .accept('application/json')
        .send(data)
        .end().then(function (response){
          page.replace('/entry/' + opts.entry.id, data);
        }
      );
    }
  </script>
</edit-entry>