<entry-view>
  <h1>
    {opts.entry.date}
    <span if="{!opts.entry.isPublic}">Private</span>
    <span if="{opts.entry.isPublic}">Public</span>
  </h1>
  <p><pre class="entry-text">{opts.entry.text}</pre></p>
  <div if="{opts.entry.isOwner}">
    <form method="post" action="/entry/{opts.entry.id}?_method=DELETE" onsubmit="{del}" class="form-submit-only">
      <input type="submit" value="Delete" class="pure-button button-warning"/>
    </form>
    <a href="/entry/{opts.entry.id}/edit" onclick="{edit}" class="pure-button button-margin-left">Edit</a>
  </div>

  <script>
    var self = this;
    self.edit = function(e){
      opts.page('/entry/' + opts.entry.id + '/edit', {data: opts.entry});
    }
    self.del = function(e){
      opts.entryService.deleteEntry(opts.entry.id).then(function (response){
        opts.page.replace('/entries');
      }, function (err){
        alert(err);
      });
    }
  </script>
</entry-view>
