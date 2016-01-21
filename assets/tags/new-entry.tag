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
    function getDate(){
      var d = new Date();
      var plainDate = new Date(Date.UTC(d.getFullYear(),
                                        d.getMonth(),
                                        d.getDate(),
                                        d.getHours(),
                                        d.getMinutes(),
                                        d.getSeconds()));
      return plainDate.toISOString().slice(0, 10);
    }
    opts.entry = {
      date: getDate()
    }
    self.update();
    this.create = function(e){
      var state = {date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked};
      opts.entryService.createEntry(state).then(function (response){
        state.id = response.body.id;
        opts.page.replace('/entry/' + response.body.id, {data: state});
      }, function (err){
        alert(err);
      });
    }
  </script>
</new-entry>
