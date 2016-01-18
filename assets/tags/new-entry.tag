<new-entry>
  <form method="post" action="/entry" onsubmit="{create}" class="pure-form pure-form-stacked">
    <fieldset>
      <legend>Create a new Entry</legend>
      <input name="date" value="{opts.entry.date}"/>
      <textarea name="text" class="entry-text"></textarea>
      Is Public: <input type="checkbox" name="isPublic" checked="{opts.entry.isPublic}"/>
      <a href="/entries" class="pure-button">Cancel</a>
      <input type="submit" class="pure-button pure-button-primary"/>
    </fieldset>
  </form>

  <script>
    var self = this;
    opts.entry = {
      date: new Date().toISOString().slice(0, 10)
    }
    self.update();
    this.create = function(e){
      var state = {date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked};
      opts.entryService.createEntry(state).then(function (response){
        state.id = response.body.id;
        opts.page.replace('/entry/' + response.body.id, {data: state});
      });
    }
  </script>
</new-entry>
