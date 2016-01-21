<entry-view>
  <h1>
    {formatDate(opts.entry.date)}
    <span if="{!opts.entry.isPublic}">Private</span>
    <span if="{opts.entry.isPublic}">Public</span>
  </h1>
  <p class="entry-text">{opts.entry.text}</p>
  <form method="post" action="/entry/{opts.entry.id}?_method=DELETE" onsubmit="{del}">
    <input type="submit" value="Delete" class="pure-button"/>
  </form>
  <a href="/entry/{opts.entry.id}/edit" onclick="{edit}" class="pure-button">Edit</a>

  <script>
    var self = this;
    self.formatDate = function(d){
      if(typeof d === 'object') return d.toISOString().slice(0, 10);
      return d.slice(0, 10);
    }
    self.edit = function(e){
      opts.page('/entry/' + opts.entry.id + '/edit', {data: opts.entry});
    }
    self.del = function(e){
      opts.entryService.deleteEntry(opts.entry.id).then(function (response){
        opts.page.replace('/entries');
      }, function (err){
        console.log('entry-view:del:err', err);
        alert(err);
      });
    }
  </script>
</entry-view>
