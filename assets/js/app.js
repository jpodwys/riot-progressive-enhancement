var page = require('page'),
  entryService = require('./entry-service'),
  entry = new (require('../../middleware/service-wrapper'))(entryService),
  riot = require('riot'),
  entryListTag = require('../tags/entry-list.tag'),
  entryViewTag = require('../tags/entry-view.tag'),
  newEntryTag = require('../tags/new-entry.tag'),
  editEntryTag = require('../tags/edit-entry.tag');

page.base('/');
page('/', entriesHandler);
page('entry/:id', entry.getEntryById, entryHandler);
page('entry/:id/edit', entry.getEntryById, editEntryHandler);
page('new', newEntryHandler);
page({dispatch: false});

function renderView(tagName, data){
  document.querySelector('main').innerHTML = '<' + tagName + '></' + tagName + '>';
  riot.mount(tagName, data);
}

function entriesHandler(ctx){
  entryService.getAllEntries().then(function (response){
    renderView('entry-list', {entries: response});
  });
}

function entryHandler(ctx){
  renderView('entry-view', {page: page, entryService: entryService, entry: ctx.state.data || ctx.response});
}

function newEntryHandler(){
  renderView('new-entry', {page: page, entryService: entryService});
}

function editEntryHandler(ctx){
  renderView('edit-entry', {page: page, entryService: entryService, entry: ctx.state.data || ctx.response});
}
