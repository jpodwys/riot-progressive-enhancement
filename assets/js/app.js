var page = require('page');
var riot = require('riot');
var promise = require('zousan');
var xhr = require('superagent-cache')();
require('superagent-promise')(xhr, promise);

var entryListTag = require('../tags/entry-list.tag');
var entryViewTag = require('../tags/entry-view.tag');
var newEntryTag = require('../tags/new-entry.tag');

page.base('/');
page('/', entries);
page('entry/:id', entry);
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
  renderView('entry-view', {entry: {id: ctx.params.id, text: ctx.state.text}, xhr: xhr});
}

function newEntry(){
  renderView('new-entry', {page: page, xhr: xhr});
}
