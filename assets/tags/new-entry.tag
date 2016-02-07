<new-entry>
  <form method="post" action="/entry" onsubmit="{upsert}" class="pure-form pure-form-stacked">
    <fieldset>
      <legend>Create a new Entry</legend>
      <input name="date" value="{opts.entry.date}" class="needsclick"/>
      <textarea name="text" class="entry-text needsclick"></textarea>
      Is Public: <input type="checkbox" name="isPublic" checked="{opts.entry.isPublic}"/>
      <a href="/entries" class="pure-button button-round">Cancel</a>
      <input type="submit" class="pure-button pure-button-primary button-round"/>
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

    if(typeof window !== 'undefined'){
      var interval = setInterval(function(){
        if(self.date.value != opts.entry.date
          || self.text.value != opts.entry.text){
          if(self.text.value && self.text.value.length){
            self.upsert({isBackgroundUpsert: true});
          }
        }
      }, 5000);

      window.journalIntervals = [interval];
    }

    self.upsert = function(e){
      if(opts.entry.id) self.updateEntry(e.isBackgroundUpsert);
      else self.createEntry(e.isBackgroundUpsert);
    }

    self.createEntry = function(isBackgroundUpsert){
      var state = {date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked};
      opts.entryService.createEntry(state).then(function (response){
        if(isBackgroundUpsert){
          opts.entry.id = response.body.id;
          opts.entry.date = self.date.value;
          opts.entry.text = self.text.value;
          opts.entry.isPublic = self.isPublic.checked;
          self.update();
        } else {
          state.id = response.body.id;
          opts.page.replace('/entry/' + response.body.id, {data: state});
        }
      }, function (err){
        alert(err);
      });
    }

    self.updateEntry = function(isBackgroundUpsert){
      var state = {id: opts.entry.id, date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked};
      opts.entryService.updateEntry(state).then(function (response){
        if(isBackgroundUpsert){
          opts.entry.date = self.date.value;
          opts.entry.text = self.text.value;
          opts.entry.isPublic = self.isPublic.checked;
          self.update();
        } else {
          opts.page.replace('/entry/' + opts.entry.id, {data: state});
        }
      }, function (err){
        alert(err);
      });
    }
  </script>
</new-entry>
