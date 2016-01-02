<entry-view>
  <div>{opts.entry.text}</div>
  <form method="post" action="/entry/{opts.entry.id}?_method=DELETE" onsubmit="{del}">
    <input type="submit" value="Delete"/>
  </form>
  <a href="/entry/{opts.entry.id}/edit" onclick="{edit}">Edit</a>

  <script>
    var self = this;
    var page = opts.page;
    var entryService = opts.entryService;
    if(opts.entry.id && !opts.entry.text && entryService){
      entryService.getEntryById(opts.entry.id).then(function (response){
        opts.entry = response.body;
        self.update();
      });
    }
    self.edit = function(e){
      e.preventDefault();
      page('/entry/' + opts.entry.id + '/edit', {text: opts.entry.text});
    }
    self.del = function(e){
      e.preventDefault();
      entryService.deleteEntry(opts.entry.id).then(function (response){
        page.replace('/');
      });
    }
  </script>
</entry-view>
