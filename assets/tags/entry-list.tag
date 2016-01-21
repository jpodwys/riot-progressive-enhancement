<entry-list>
  <div each={opts.entries} class="entry-preview">
    <a class="entry-link" href="/entry/{id}">{this.parent.formatDate(date)}</a>
    <span if="{!isPublic}">Private</span>
    <span if="{isPublic}">Public</span>
    <p class="entry-text">{text}</p>
  </div>

  <script>
    var self = this;
    self.formatDate = function(d){
      if(typeof d === 'object') return d.toISOString().slice(0, 10);
      return d.slice(0, 10);
    }
  </script>
</entry-list>
