var page = require('page'),
  userService = require('./user-service'),
  user = new (require('../../middleware/service-wrapper'))(userService),
  entryService = require('./entry-service'),
  entry = new (require('../../middleware/service-wrapper'))(entryService),
  riot = require('riot'),
  loginPageTag = require('../tags/login-page.tag'),
  entryListTag = require('../tags/entry-list.tag'),
  entryViewTag = require('../tags/entry-view.tag'),
  newEntryTag = require('../tags/new-entry.tag'),
  editEntryTag = require('../tags/edit-entry.tag'),
  mainTag = document.querySelector('main');

page.base('/');
page('/', loginHandler);
page('entries', entry.getAllEntries, entriesHandler);
page('entry/:id', entry.getEntryById, entryHandler);
page('entry/:id/edit', entry.getEntryById, editEntryHandler);
page('new', newEntryHandler);
page({dispatch: false});

function renderView(tagName, data){
  mainTag.innerHTML = '<' + tagName + '></' + tagName + '>';
  riot.mount(tagName, data);
}

function loginHandler(){
  renderView('login-page', {page: page, userService: userService});
}

function entriesHandler(ctx){
  renderView('entry-list', ctx.response);
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
