<all-tags>
  <login-page></login-page>

  <entry-list
    query={opts['entry-list'].query}
    offset={opts['entry-list'].offset}
    entries={opts['entry-list'].entries}
    entry-count={opts['entry-list'].entryCount}
    data={opts['entry-list'].data}>
  </entry-list>

  <entry-view
    entry={opts['entry-view'].entry}>
  </entry-view>

  <entry-view
    del-click-count="1"
    entry={opts['entry-view'].entry}>
  </entry-view>

  <edit-entry
    entry={opts['entry-view'].entry}>
  </edit-entry>

  <new-entry></new-entry>

  <pagination
    data={opts['pagination']}></pagination>
</all-tags>