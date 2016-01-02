<edit-entry>
  <form method="post" action="/entry/{opts.entry.id}?_method=PUT" onsubmit="{edit}">
    <input type="hidden" name="id" value="{opts.entry.id}"/>
    <textarea name="text">{opts.entry.text}</textarea>
    <input type="submit"/>
  </form>

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
    this.edit = function(e){
      e.preventDefault();
      var state = {text: self.text.value};
      entryService.updateEntry(self.id.value, self.text.value).then(function (response){
        page.replace('/entry/' + self.id.value, state);
      });
    }
  </script>
</edit-entry>
