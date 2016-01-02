<new-entry>
  <form method="post" action="/entry" onsubmit="{create}">
    <input type="hidden" name="method" value="post"/>
    <textarea name="text"></textarea>
    <input type="submit"/>
  </form>

  <script>
    var self = this;
    var page = opts.page;
    var entryService = opts.entryService;
    this.create = function(e){
      e.preventDefault();
      var state = {text: self.text.value};
      entryService.createEntry(self.text.value).then(function (response){
        page.replace('/entry/' + response.body.id, state);
      });
    }
  </script>
</new-entry>
