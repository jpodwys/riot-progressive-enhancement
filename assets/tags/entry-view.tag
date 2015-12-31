<entry-view>
  <div>{opts.entry.text}</div>
  <form method="post" action="/entry/?_method=DELETE" onsubmit="{del}">
    <input type="hidden" name="id" value="{opts.entry.id}"/>
    <input type="submit" value="Delete"/>
  </form>
  <a href="/entry/{opts.entry.id}/edit" onclick="{edit}">Edit</a>

  <script>
    var self = this;
    var xhr = opts.xhr;
    var page = opts.page;
    if(opts.entry.id && !opts.entry.text){
      xhr.get('/entry/' + opts.entry.id)
        .accept('application/json')
        .end().then(function (response){
          opts.entry = response.body;
          self.update();
        }
      );
    }
    self.edit = function(e){
      e.preventDefault();
      page('/entry/' + opts.entry.id + '/edit', {text: opts.entry.text});
    }
    self.del = function(e){
      e.preventDefault();
      var data = {id: opts.entry.id};
      xhr.del('/entry')
        .accept('application/json')
        .send(data)
        .pruneOptions(['content-type'])
        .end().then(function (response){
          page.replace('/');
        }
      );
    }
  </script>
</entry-view>
