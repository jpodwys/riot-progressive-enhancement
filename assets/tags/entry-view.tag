<entry-view>
  <div if={opts.err && opts.err.status == 404} style="text-align:center;">
    <h2 style="margin-top:150px;">Entry not found</h2>
  </div>
  <h1 if={!opts.err}>
    {opts.entry.date}
    <span if="{!opts.entry.isPublic}">Private</span>
    <span if="{opts.entry.isPublic}">Public</span>
  </h1>
  <div class="entry-text">{opts.entry.text}</div>
  <div if="{opts.entry.isOwner}" class="entry-actions">
    <form method="post" action="/entry/{opts.entry.id}?_method=DELETE" onsubmit="{del}" class="form-submit-only">
      <input
        type="submit"
        value="{opts.delText}"
        class="pure-button {'button-warning': !opts.delClickCount, 'button-error': opts.delClickCount} action entry-action--left"/>
    </form>
    <a href="/entry/{opts.entry.id}/edit" onclick="{edit}" class="pure-button button-margin-left action entry-action--right">Edit</a>
  </div>

  <script>
    var self = this;
    opts.delText = 'Delete';
    opts.delClickCount = 0;
    self.edit = function(e){
      opts.page('/entry/' + opts.entry.id + '/edit', {data: opts.entry});
    }
    self.del = function(e){
      ++opts.delClickCount;
      if(opts.delClickCount === 1){
        opts.delText = 'Confirm';
        return self.update();
      }
      opts.entryService.deleteEntry(opts.entry.id).then(function (response){
        window.deleteEntriesKeys();
        opts.page.replace('/entries');
      }, function (err){
        alert(err);
      });
    }
  </script>
</entry-view>
