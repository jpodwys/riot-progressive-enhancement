<entry-list>
  <div each={opts.entries}>
    <a href="/entry/{id}">{this.parent.formatDate(date)}</a>
    <span if="{!isPublic}">Private</span>
    <span if="{isPublic}">Public</span>
    <p>{text}</p>
  </div>

  <script>
    var self = this;
    var entryService = opts.entryService;
    if(!opts.entries && entryService){
      entryService.getAllEntries().then(function (response){
        opts.entries = response.body;
        self.update();
      });
    }
    self.formatDate = function(d){
      return new Date(d).toISOString().slice(0, 10);
    }
  </script>
</entry-list>
