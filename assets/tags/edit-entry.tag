<edit-entry>
  <form method="post" action="/entry/{opts.entry.id}?_method=PUT" onsubmit="{edit}" class="pure-form pure-form-stacked">
    <fieldset>
      <legend>Edit Your Entry</legend>
      <input type="hidden" name="id" value="{opts.entry.id}" class="needsclick"/>
      <input name="date" value="{opts.entry.date}"/>
      <textarea name="text" class="entry-text needsclick">{opts.entry.text}</textarea>
      Is Public: <input type="checkbox" name="isPublic" checked="{opts.entry.isPublic}"/>
      <a href="/entry/{opts.entry.id}" class="pure-button">Cancel</a>
      <input type="submit" class="pure-button pure-button-primary"/>
    </fieldset>
  </form>

  <script>
    var self = this;
    this.edit = function(e){
      var state = {id: self.id.value, date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked, isOwner: true};
      opts.entryService.updateEntry(state).then(function (response){
        opts.page.replace('/entry/' + self.id.value, {data: state});
      }, function (err){
        alert(err);
      });
    }
  </script>
</edit-entry>
