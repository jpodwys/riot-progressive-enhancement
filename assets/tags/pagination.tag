<pagination if="{totalPages > 1}">
  <ul class="pagination">
    <li><a href="{firstPage}">«</a></li>
    <li><a href="{prevPage}">‹</a></li>

    <li each="{pages}"><a href="{href}">{page}</a></li>

    <li><a href="{nextPage}">›</a></li>
    <li><a href="{lastPage}">»</a></li>
  </ul>

  <script>
    var self = this;

    function prepPagination(){
      console.log('OFFSET', opts.data.offset);
      var totalPages = Math.ceil(opts.data.total / opts.data.offset);
      var pages = [];

      for(var i = 1; i <= totalPages; ++i){
        if(i == 1){
          // if(Math.abs(opts.data.current - i) == 1){
          //   if(opts.data.queryString.length > 1) pages.push({page: i, href: opts.data.url + opts.data.queryString});
          //   else pages.push({page: i, href: opts.data.url});
          // } else {
            pages.push({page: i, href: opts.data.url + opts.data.queryString});
          // }
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
      self.prevPage += (opts.data.current > 2) ? 'p=' + (opts.data.current - 1) : '';
      self.nextPage = opts.data.url + opts.data.queryString + 'p=' + (opts.data.current + 1);
      self.lastPage = opts.data.url + opts.data.queryString + 'p=' + totalPages;
      self.totalPages = totalPages;
    }

    prepPagination();
    self.update();
  </script>
</pagination>
