<entry-view>
  <div>{opts.entry.text}</div>
  <a href="/entry/{opts.entry.id}/edit" onclick="{edit}">Edit</a>

  <script>
    var self = this;
    var xhr = opts.xhr;
    var page = opts.page;
    if(opts.entry.id && !opts.entry.text){
      xhr.get('/entry/' + opts.entry.id).accept('application/json').end().then(function (response){
        opts.entry = response.body;
        self.update();
      });
    }
    self.edit = function(e){
      e.preventDefault();
      page('/entry/' + opts.entry.id + '/edit', {text: opts.entry.text});
    }
  </script>
</entry-view>
