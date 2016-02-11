<pagination if="{totalPages > 1}">
  <ul class="pagination">
    <li><a href="{firstPage}" class="{active: current == 1}">«</a></li>
    <li><a href="{prevPage}" class="{active: current == 1}">‹</a></li>
    <li each="{pages}"><a href="{href}" class="{active: current == page}">{page}</a></li>
    <li><a href="{nextPage}" class="{active: current == totalPages}">›</a></li>
    <li><a href="{lastPage}" class="{active: current == totalPages}">»</a></li>
  </ul>

  <script>
    var self = this;

    function prepPagination(){
      var totalPages = Math.ceil(opts.data.total / opts.data.offset);
      var pages = [];

      for(var i = 1; i <= totalPages; ++i){
        if(i == 1){
          pages.push({page: i, href: opts.data.url + opts.data.queryString});
        }
        else if(opts.data.current < 3 && i < 6){
          pages.push({page: i, href: opts.data.url + opts.data.queryString + 'p=' + i});
        }
        else if((opts.data.current > totalPages - 3) && (i > totalPages - 5)){
          pages.push({page: i, href: opts.data.url + opts.data.queryString + 'p=' + i});
        }
      }

      self.current = opts.data.current;
      self.pages = pages;
      self.firstPage = opts.data.url;
      self.firstPage += (opts.data.queryString.length > 1) ? opts.data.queryString : '';
      self.prevPage = opts.data.url + opts.data.queryString;
      self.prevPage += (opts.data.current > 2) ? 'p=' + (parseInt(opts.data.current, 10) - 1) : '';
      self.nextPage = opts.data.url + opts.data.queryString + 'p=' + (parseInt(opts.data.current, 10) + 1);
      self.lastPage = opts.data.url + opts.data.queryString + 'p=' + totalPages;
      self.totalPages = totalPages;
    }

    prepPagination();
    self.update();
  </script>
</pagination>
