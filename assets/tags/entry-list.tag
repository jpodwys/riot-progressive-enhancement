<entry-list>
  <form method="get" action="/entries/" onsubmit="{search}" class="pure-form block">
    <input name="q" placeholder="Search" class="pure-u-1 pure-u-sm-1-2 pure-u-sm-1-3 block center"/>
  </form>
  <div each={opts.entries} class="entry-preview">
    <a class="entry-link" href="/entry/{id}">{date}</a>
    <span if="{!isPublic}">Private</span>
    <span if="{isPublic}">Public</span>
    <p class="entry-text">{text}</p>
  </div>
</entry-list>
