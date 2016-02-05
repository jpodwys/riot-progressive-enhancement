<entry-list>
  <form method="get" action="/entries" onsubmit="{search}" class="pure-form block">
    <input name="q" placeholder="Search" value="{opts.query.q}" class="pure-u-1 pure-u-sm-1-2 pure-u-sm-1-3 block center needsclick"/>
  </form>
  <div each={opts.entries} class="entry-preview">
    <a class="entry-link" href="/entry/{id}">{date}</a>
    <span if="{!isPublic}">Private</span>
    <span if="{isPublic}">Public</span>
    <p class="entry-text">{text}</p>
  </div>

  <script>
    var self = this;
    self.search = function(e){
      e.preventDefault();
      opts.page('/entries?q=' + self.q.value);
      // if(self.q.value.length){
      //   opts.entryService.getAllEntries('q=' + self.q.value).then(function (response){
      //     opts.page('/entries?q=' + self.q.value, {data: response.body});
      //   }, function (err){
      //     console.log(err);
      //   });
      // }
    }
  </script>
</entry-list>
