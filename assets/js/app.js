var page = require('page'),
  entryService = require('./entry-service.js');
  riot = require('riot'),
  entryListTag = require('../tags/entry-list.tag'),
  entryViewTag = require('../tags/entry-view.tag'),
  newEntryTag = require('../tags/new-entry.tag'),
  editEntryTag = require('../tags/edit-entry.tag');

page.base('/');
page('/', entries);
page('entry/:id', entry);
page('entry/:id/edit', editEntry);
page('new', newEntry);
page({dispatch: false});

function renderView(tagName, data){
  document.querySelector('main').innerHTML = '<' + tagName + '></' + tagName + '>';
  riot.mount(tagName, data);
}

function entries(){
  renderView('entry-list', {entryService: entryService});
}

function entry(ctx){
  var entry = ctx.state.entry || {};
  entry.id = ctx.params.id;
  renderView('entry-view', {page: page, entryService: entryService, entry: entry});
}

function newEntry(){
  renderView('new-entry', {page: page, entryService: entryService});
}

function editEntry(ctx){
  var entry = ctx.state.entry || {};
  entry.id = ctx.params.id;
  renderView('edit-entry', {page: page, entryService: entryService, entry: entry});
}
