<new-entry>
  <form method="post" action="/entry" onsubmit="{create}">
    <input name="date" value="{opts.entry.date}"/>
    <textarea name="text"></textarea>
    Is Public: <input type="checkbox" name="isPublic" checked="{opts.entry.isPublic}"/>
    <input type="submit"/>
  </form>

  <script>
    var self = this;
    opts.entry = {
      date: new Date().toISOString().slice(0, 10)
    }
    self.update();
    this.create = function(e){
      e.preventDefault();
      var state = {date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked};
      opts.entryService.createEntry(state).then(function (response){
        state.id = response.body.id;
        opts.page('/entry/' + response.body.id, {data: state});
      });
    }
  </script>
</new-entry>
