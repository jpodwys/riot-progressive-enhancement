var page = require('page'),
  qs = require('./qs'),
  userService = require('./user-service'),
  user = new (require('../../middleware/service-wrapper'))(userService),
  entryService = require('./entry-service'),
  entry = new (require('../../middleware/service-wrapper'))(entryService),
  fastclick = require('fastclick'),
  riot = require('riot'),
  loginPageTag = require('../tags/login-page.tag'),
  entryListTag = require('../tags/entry-list.tag'),
  paginationTag = require('../tags/pagination.tag'),
  entryViewTag = require('../tags/entry-view.tag'),
  newEntryTag = require('../tags/new-entry.tag'),
  editEntryTag = require('../tags/edit-entry.tag'),
  mainTag = document.querySelector('main'),
  wrapperTag = document.getElementById('main-wrapper'),
  navLinks = document.getElementById('nav-links'),
  timer;

fastclick(document.body);

var clearIntervals = function(ctx, next){ next(); }

window.journalIntervals = [];

clearIntervals = function(ctx, next){
  for(var i = 0; i < window.journalIntervals.length; ++i){
    clearInterval(window.journalIntervals[i]);
  }
  window.journalIntervals = [];
  next();
}

page.base('/');
page('*', clearIntervals);
page('/', loginHandler);
page('entries', loading, restrict, entry.getAllEntries, errorHandler, doneLoading, entriesHandler);
page('entry/new', restrict, newEntryHandler);
page('entry/:id', loading, entry.getEntryById, errorHandler, doneLoading, entryHandler);
page('entry/:id/edit', restrict, entry.getEntryById, errorHandler, editEntryHandler);
page({dispatch: true});

function restrict(ctx, next){
  if(!~document.cookie.indexOf('logged_in')){
    ctx.alert = {
      type: 'error',
      message: 'Please login or create an account to proceed.'
    }
    page.redirect('/');
  }
  else{
    next();
  }
}

function loading(ctx, next){
  clearTimeout(timer);
  timer = setTimeout(function(){
    wrapperTag.classList.add('loading');
  }, 250);
  next();
}

function doneLoading(ctx, next){
  clearTimeout(timer);
  wrapperTag.classList.remove('loading');
  next();
}

function errorHandler(ctx, next){
  if(ctx.err){
    switch(ctx.err.status){
      case 400:
        ctx.alert = {
          type: 'error',
          message: 'Invalid username/password combination.'
        }
        next();
        break;
      case 404:
        ctx.alert = {
          type: 'error',
          message: 'The entry cannot be found.'
        }
        next();
        break;
      case 500:
        ctx.alert = {
          type: 'error',
          message: 'Something went wrong. Please try again.'
        }
        next();
        break;
      default: next();
    }
  }
  else{
    next();
  }
}

function renderView(tagName, data){
  mainTag.innerHTML = '<' + tagName + '></' + tagName + '>';
  riot.mount(tagName, data);
  var loggedIn = (~document.cookie.indexOf('logged_in'));
  if(loggedIn) navLinks.hidden = false;
  else navLinks.hidden = true;
}

function loginHandler(ctx){
  renderView('login-page', {
    page: page,
    userService: userService,
    alert: ctx.alert
  });
}

function entriesHandler(ctx){
  renderView('entry-list', {
    page: page,
    entryService: entryService,
    entries: (ctx.response) ? ctx.response.entries : [],
    entryCount: (ctx.response) ? ctx.response.entryCount : 0,
    offset: (ctx.response) ? ctx.response.offset : 20,
    query: qs.parse(location.search.slice(1))
  });
}

function entryHandler(ctx){
  renderView('entry-view', {
    page: page,
    entryService: entryService,
    entry: ctx.state.data || ctx.response.entry
  });
}

function newEntryHandler(ctx){
  renderView('new-entry', {
    page: page,
    entryService: entryService
  });
}

function editEntryHandler(ctx){
  renderView('edit-entry', {
    page: page,
    entryService: entryService,
    entry: ctx.state.data || ctx.response.entry
  });
}
