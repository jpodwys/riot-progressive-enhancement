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
    if(opts.entry.date.toString().indexOf('-') < 0) formatDate();
    function formatDate(){
      opts.entry.date = new Date(opts.entry.date).toISOString().slice(0, 10);
      self.update();
    }
    this.edit = function(e){
      e.preventDefault();
      var state = {id: self.id.value, date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked};
      opts.entryService.updateEntry(state).then(function (response){
        opts.page.replace('/entry/' + self.id.value, {entry: state});
      });
    }
  </script>
</edit-entry>
