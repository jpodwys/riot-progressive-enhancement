<entry-view>
  <h1>{opts.entry.date}</h1>
  <span if="{!opts.entry.isPublic}">Private</span>
  <span if="{opts.entry.isPublic}">Public</span>
  <div>{opts.entry.text}</div>
  <form method="post" action="/entry/{opts.entry.id}?_method=DELETE" onsubmit="{del}">
    <input type="submit" value="Delete"/>
  </form>
  <a href="/entry/{opts.entry.id}/edit" onclick="{edit}">Edit</a>

  <script>
    var self = this;
    (opts.server) ? serverInit() : clientInit();
    function serverInit(){
      formatDate();
    }
    function clientInit(){
      if(opts.entry.id && !opts.entry.text){
        opts.entryService.getEntryById(opts.entry.id).then(function (response){
          opts.entry = response;
          formatDate();
        });
      }
    }
    function formatDate(){
      opts.entry.date = new Date(opts.entry.date).toISOString().slice(0, 10);
      self.update();
    }
    self.edit = function(e){
      e.preventDefault();
      opts.page('/entry/' + opts.entry.id + '/edit', {entry: opts.entry});
    }
    self.del = function(e){
      e.preventDefault();
      opts.entryService.deleteEntry(opts.entry.id).then(function (response){
        opts.page.replace('/');
      });
    }
  </script>
</entry-view>
