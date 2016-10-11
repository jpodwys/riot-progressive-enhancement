<new-entry>
  <form method="post" action="/entry" onsubmit="{upsert}" class="pure-form pure-form-stacked">
    <fieldset>
      <!-- <legend class="hide-on-mobile">Create a new Entry</legend> -->
      <input name="date" value="{opts.entry.date}" class="needsclick"/>
      <textarea name="text" class="entry-text needsclick"></textarea>
      Is Public: <input type="checkbox" name="isPublic" checked="{opts.entry.isPublic}"/>
      <div class="entry-actions">
        <a href="/entries" onclick="{back}" class="pure-button button-round entry-action--left">Cancel</a>
        <input type="submit" class="pure-button pure-button-primary button-round entry-action--right"/>
      </div>
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

    // Still need to make this work when rendering server side
    self.back = function(){
      window.history.back();
    }

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

    if(typeof window !== 'undefined'){
      var interval = setInterval(function(){
        if(entryHasChanged()){
          self.upsert({isBackgroundUpsert: true});
        }
      }, 5000);

      window.journalIntervals = [interval];
    }

    self.upsert = function(e){
      if(opts.entry.id){
        if(!e.isBackgroundUpsert && !entryHasChanged()){
          var state = {
            id: opts.entry.id,
            date: self.date.value,
            text: self.text.value,
            isPublic: self.isPublic.checked,
            isOwner: true
          };
          opts.page.replace('/entry/' + opts.entry.id, {data: state});
        } else {
          self.updateEntry(e.isBackgroundUpsert);
        }
      } else {
        self.createEntry(e.isBackgroundUpsert);
      }
    }

    self.createEntry = function(isBackgroundUpsert){
      var state = {date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked, isOwner: true};
      opts.entryService.createEntry(state).then(function (response){
        window.deleteEntriesKeys();
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
      var state = {id: opts.entry.id, date: self.date.value, text: self.text.value, isPublic: self.isPublic.checked, isOwner: true};
      opts.entryService.updateEntry(state).then(function (response){
        window.deleteEntriesKeys();
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
