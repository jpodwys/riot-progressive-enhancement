<edit-entry>
  <form method="post" action="/entry/{opts.entry.id}?_method=PUT" onsubmit="{edit}" class="pure-form pure-form-stacked">
    <fieldset>
      <!-- <legend class="hide-on-mobile">Edit Your Entry</legend> -->
      <input type="hidden" name="id" value="{opts.entry.id}" class="needsclick"/>
      <input name="date" value="{opts.entry.date}"/>
      <textarea name="text" class="entry-text needsclick">{opts.entry.text}</textarea>
      Is Public: <input type="checkbox" name="isPublic" checked="{opts.entry.isPublic}"/>
      <div class="entry-actions">
        <a href="/entry/{opts.entry.id}" class="pure-button entry-action--left">Cancel</a>
        <input type="submit" class="pure-button pure-button-primary entry-action--right"/>
      </div>
    </fieldset>
  </form>

  <script>
    var self = this;

    function entryHasChanged(){
      if(self.date.value != opts.entry.date
        || self.text.value != opts.entry.text
        || self.isPublic.checked != opts.entry.isPublic){
        if(self.text.value && self.text.value.length){
          return true;
        }
      }
      return false;
    }

    this.edit = function(e){
      var state = {
        id: self.id.value,
        date: self.date.value,
        text: self.text.value,
        isPublic: self.isPublic.checked,
        isOwner: true
      }
      if(entryHasChanged()){
        opts.entryService.updateEntry(state).then(function (response, key){
          window.deleteEntriesKeys();
          opts.page.replace('/entry/' + self.id.value, {data: state});
        }, function (err){
          alert(err);
        });
      } else {
        opts.page.replace('/entry/' + self.id.value, {data: state});
      }
    }
  </script>
</edit-entry>
