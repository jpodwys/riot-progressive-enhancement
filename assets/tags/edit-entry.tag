<edit-entry>
  <form method="post" action="/entry/{opts.entry.id}?_method=PUT" onsubmit="{edit}">
    <input type="hidden" name="id" value="{opts.entry.id}"/>
    <input name="date" value="{opts.entry.date}"/>
    <textarea name="text">{opts.entry.text}</textarea>
    Is Public: <input type="checkbox" name="isPublic" checked="{opts.entry.isPublic}"/>
    <input type="submit"/>
  </form>

  <script>
    var self = this;
    var page = opts.page;
    var entryService = opts.entryService;
    if(opts.server){
      formatDate();
      self.update();
    }
    else if(opts.entry.id && !opts.entry.text && entryService){
      entryService.getEntryById(opts.entry.id).then(function (response){
        opts.entry = response.body;
        self.update();
      });
    }
    function formatDate(){
      opts.entry.date = new Date(opts.entry.date).toISOString().slice(0,10);
    }
    this.edit = function(e){
      e.preventDefault();
      var state = {id: self.id.value, date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked};
      entryService.updateEntry(state).then(function (response){
        page.replace('/entry/' + self.id.value, {entry: state});
      });
    }
  </script>
</edit-entry>
