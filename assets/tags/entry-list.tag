<entry-list>
  <div each={opts.entries} class="entry-preview">
    <a class="entry-link" href="/entry/{id}">{date}</a>
    <span if="{!isPublic}">Private</span>
    <span if="{isPublic}">Public</span>
    <p class="entry-text">{text}</p>
  </div>
</entry-list>
