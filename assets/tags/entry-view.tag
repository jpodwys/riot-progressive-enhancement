<entry-view>
  <div>{opts.entry.text}</div>

  <script>
    var self = this;
    var xhr = opts.xhr;
    var entry = opts.entry;
    if(!opts.entry.text){
      xhr.get('/entry/' + opts.entry.id).accept('application/json').then(function (response){
        opts.entry = response.body;
        self.update();
      });
    }
  </script>
</entry-view>