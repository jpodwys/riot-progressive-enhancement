var fs = require('fs');
var page = require('page');
var riot = require('riot');
var promise = require('zousan');
var superagent = require('superagent-cache')();
require('superagent-promise')(superagent, promise);

page.base('/');
page('/', entries);
page('entry/:id', entry);
page('new', newEntry);
page({dispatch: false});

function fetchData(dPath, cache){
  var fn = (cache) ? 'end' : '_end';
  return superagent.get(dPath).accept('application/json')[fn]();
}

function renderView(riotMarkup, riotTag, data){
  document.querySelector('main').innerHTML = riotMarkup;
  riot.mount(riotTag, data);
}

function entries(){
  var entryList = require('../tags/entry-list.tag');
  fetchData('/', false).then(function (response){
    renderView('<entry-list></entry-list>', entryList, {entries: response.body.entries});
  });
}

function entry(ctx){
  var entryView = require('../tags/entry-view.tag');
  fetchData('/entry/' + ctx.params.id, true).then(function (response){
    renderView('<entry-view></entry-view>', entryView, {entry: response.body.entry});
  });
}

function newEntry(){
  var newEntry = require('../tags/new-entry.tag');
  renderView('<new-entry></new-entry>', newEntry);
}
