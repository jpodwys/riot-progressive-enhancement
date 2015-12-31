<entry-list>
  <div each={opts.entries}><a href="/entry/{id}">{text}</a></div>

  <script>
    var self = this;
    var xhr = opts.xhr;
    var entry = opts.entry;
    if(!opts.entries){
      xhr.get('/').accept('application/json')._end().then(function (response){
        opts.entries = response.body;
        self.update();
      });
    }
  </script>
</entry-list>
