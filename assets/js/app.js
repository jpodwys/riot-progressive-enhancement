var page = require('page');
var riot = require('riot');
var promise = require('zousan');
var xhr = require('superagent-cache')();
require('superagent-promise')(xhr, promise);

var entryListTag = require('../tags/entry-list.tag');
var entryViewTag = require('../tags/entry-view.tag');
var newEntryTag = require('../tags/new-entry.tag');
var editEntryTag = require('../tags/edit-entry.tag');

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
  renderView('entry-list', {xhr: xhr});
}

function entry(ctx){
  renderView('entry-view', {page: page, xhr: xhr, entry: {id: ctx.params.id, text: ctx.state.text}});
}

function newEntry(){
  renderView('new-entry', {page: page, xhr: xhr});
}

function editEntry(ctx){
  renderView('edit-entry', {page: page, xhr: xhr, entry: {id: ctx.params.id, text: ctx.state.text}});
}
