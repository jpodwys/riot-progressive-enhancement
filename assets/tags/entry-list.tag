<entry-list>
  <div each={opts.entries}><a href="/entry/{id}">{text}</a></div>

  <script>
    var self = this;
    var entryService = opts.entryService;
    if(!opts.entries && entryService){
      entryService.getAllEntries().then(function (response){
        opts.entries = response.body;
        self.update();
      });
    }
  </script>
</entry-list>
