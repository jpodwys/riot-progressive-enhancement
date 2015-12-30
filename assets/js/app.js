var fs = require('fs');
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

function renderView(riotMarkup, riotTag, data){
  document.querySelector('main').innerHTML = riotMarkup;
  riot.mount(riotTag, data);
}

function entries(){
  renderView('<entry-list></entry-list>', entryListTag, {xhr: xhr});
}

function entry(ctx){
  renderView('<entry-view></entry-view>', entryViewTag, {entry: {id: ctx.params.id, text: ctx.state.text}, xhr: xhr});
}

function newEntry(){
  renderView('<new-entry></new-entry>', newEntryTag, {page: page, xhr: xhr});
}
