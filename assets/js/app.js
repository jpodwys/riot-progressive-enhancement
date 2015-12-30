var fs = require('fs');
var page = require('page');
var riot = require('riot');
var promise = require('zousan');
var xhr = require('superagent-cache')();
require('superagent-promise')(xhr, promise);

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
  var entryList = require('../tags/entry-list.tag');
  renderView('<entry-list></entry-list>', entryList, {xhr: xhr});
}

function entry(ctx){
  var entryView = require('../tags/entry-view.tag');
  renderView('<entry-view></entry-view>', entryView, {entry: {id: ctx.params.id, text: ctx.state.text}, xhr: xhr});
}

function newEntry(){
  var newEntry = require('../tags/new-entry.tag');
  renderView('<new-entry></new-entry>', newEntry, {page: page, xhr: xhr});
}
