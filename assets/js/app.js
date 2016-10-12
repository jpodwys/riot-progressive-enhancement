var page = require('page'), //3.2kb
  qs = require('./qs'), //0.1kb
  xhr = require('./xhr'), //6.1kb (superagent is 3.3kb and superagent-cache is 2.8kb)
  // userService = require('./user-service'),
  // user = new (require('../../middleware/service-wrapper'))(userService),
  entryService = require('./entry-service'),
  entry = new (require('../../middleware/service-wrapper'))(entryService),
  prefetch = require('prefetch'), //0.7kb
  fastclick = require('fastclick'), //1.8kb
  swipe = require('./swipe'), //0.3kb
  arrow = require('./arrow'), //0.3kb
  riot = require('riot'), //~9kb
  // loginPageTag = require('../tags/login-page.tag'),
  entryListTag = require('../tags/entry-list.tag'),
  paginationTag = require('../tags/pagination.tag'),
  entryViewTag = require('../tags/entry-view.tag'), //0.3kb
  newEntryTag = require('../tags/new-entry.tag'),
  editEntryTag = require('../tags/edit-entry.tag'),
  loadCSS = require('fg-loadcss').loadCSS, //0.3kb
  mainTag = document.getElementById('main'),
  wrapperTag = document.getElementById('main-wrapper'),
  navLinks = document.getElementById('nav-links'),
  entriesLink = document.getElementById('entries-link'),
  timer;

window.page = page;
window.entryIds = [];
window.entriesKeys = [];
window.deleteEntriesKeys = function(){
  if(window.entriesKeys.length > 0){
    xhr.cache.del(entriesKeys);
    window.entriesKeys = [];
    entriesLink.removeAttribute('data-no-prefetch');
  }
}

/*! onloadCSS: adds onload support for asynchronous stylesheets loaded with loadCSS. [c]2016 @zachleat, Filament Group, Inc. Licensed MIT */
function onloadCSS(ss, callback){
  var called;
  function newcb(){
    if(!called && callback){
      called = true;
      callback.call( ss );
    }
  }
  if(ss.addEventListener){
    ss.addEventListener('load', newcb);
  }
  if(ss.attachEvent){
    ss.attachEvent('onload', newcb);
  }
  if('isApplicationInstalled' in navigator && 'onloadcssdefined' in ss){
    ss.onloadcssdefined(newcb);
  }
}

/* http://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript */
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = '; expires=' + date.toGMTString();
  }
  else var expires = '';
  document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// If touch is available, use fastclick, otherwise use prefetch
if(('ontouchstart' in window) ||
  (navigator.maxTouchPoints > 0) ||
  (navigator.msMaxTouchPoints > 0)){
  fastclick(document.body);    
} //else {
  var prefetchCallback = function prefetchCallback(url, anchor){
    if(url && ~url.indexOf('/entry')){
      var index = url.substring(url.indexOf('/entry/') + 7);
      entryService.getEntryById(index).end(function(r){});
    }
    else if(url && ~url.indexOf('/entries')){
      var search = (~url.indexOf('?')) ? url.slice(url.indexOf('?') + 1) : '';
      var query = qs.parse(search);
      var q = {querystring: query};
      entryService.getEntriesByOwnerId(q).end(function(r){});
    }
  }
  prefetch.init({
    containers: ['main', '#nav-links'],
    exclusions: ['/edit', '/new'],
    enableTouch: true,
    callback: prefetchCallback
  });
// }

window.journalIntervals = [];

function clearIntervals(ctx, next){
  for(var i = 0; i < window.journalIntervals.length; ++i){
    clearInterval(window.journalIntervals[i]);
  }
  window.journalIntervals = [];
  next();
}

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

// function errorHandler(ctx, next){
//   // if(ctx.err){
//   //   switch(ctx.err.status){
//   //     case 400:
//   //       ctx.alert = {
//   //         type: 'error',
//   //         message: 'Invalid username/password combination.'
//   //       }
//   //       next();
//   //       break;
//   //     case 404:
//   //       ctx.alert = {
//   //         type: 'error',
//   //         message: 'The entry cannot be found.'
//   //       }
//   //       next();
//   //       break;
//   //     case 500:
//   //       ctx.alert = {
//   //         type: 'error',
//   //         message: 'Something went wrong. Please try again.'
//   //       }
//   //       next();
//   //       break;
//   //     default: next();
//   //   }
//   // }
//   // else{
//     next();
//   // }
// }

function renderView(tagName, data){
  mainTag.innerHTML = '<' + tagName + '></' + tagName + '>';
  riot.mount(tagName, data);
  var loggedIn = (~document.cookie.indexOf('logged_in'));
  if(loggedIn) navLinks.hidden = false;
  else navLinks.hidden = true;
}

// function loginHandler(ctx){
//   renderView('login-page', {
//     page: page,
//     userService: userService,
//     alert: ctx.alert
//   });
// }

function entriesHandler(ctx){
  if(ctx.response){
    window.entryIds = ctx.response.ids.map(function (obj){
      return obj.id;
    });
  }
  renderView('entry-list', {
    page: page,
    entryService: entryService,
    entries: (ctx.response) ? ctx.response.entries : [],
    entryCount: (ctx.response) ? ctx.response.ids.length : 0,
    offset: (ctx.response) ? ctx.response.offset : 20,
    query: qs.parse(location.search.slice(1))
  });
}

function entryHandler(ctx, next){
  renderView('entry-view', {
    page: page,
    entryService: entryService,
    entry: ctx.state.data || ctx.response.entry,
    err: ctx.err
  });
  if(next) next();
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

function registerSwipeListener(){
  swipe.addMultipleListeners(document, 'mousedown touchstart', swipe.swipeStart);
  swipe.addMultipleListeners(document, 'mousemove touchmove', swipe.swipeMove);
  swipe.addMultipleListeners(document, 'mouseup touchend', swipe.swipeEnd);
}

function fetchEntryIds(ctx, next){
  if(readCookie('logged_in') && !window.entryIds.length){
    entryService.getAllEntryIdsByOwnerId().then(function (response, key){
      window.entryIds = response.body.ids.map(function (obj){
        return obj.id
      });
    }, function (err){
      // Do nothing for now
    });
  }
  next();
}

function getPrevNext(ctx){
  debugger
  if(!ctx || !ctx.params || !ctx.params.id) return;
  var index = window.entryIds.indexOf(parseInt(ctx.params.id, 10));
  if(index === -1) return;
  if(index - 1 > -1){
    entryService.getEntryById(window.entryIds[index - 1]).end(function(r){});
  }
  if(index + 1 < window.entryIds.length){
    entryService.getEntryById(window.entryIds[index + 1]).end(function(r){});
  }
}

function setupRoutes(){
  page.base('/');
  page('*', clearIntervals);
  // page.exit('*', function (ctx, next){
  //   debugger
  //   if(ctx.state.scrollPosition != document.body.scrollTop){
  //     ctx.state.scrollPosition = document.body.scrollTop;
  //     if(ctx.state.path == window.location.pathname + window.location.search){
  //       ctx.save(next);
  //     } else {
  //       next();
  //     }
  //   } else {
  //     next();
  //   }
  // });
  // page('/', loginHandler);
  page('entries', loading, restrict, entry.getEntriesByOwnerId, doneLoading, entriesHandler);
  page('entry/new', restrict, newEntryHandler);
  page('entry/:id', loading, entry.getEntryById, doneLoading, entryHandler, fetchEntryIds, getPrevNext);
  page('entry/:id/edit', restrict, entry.getEntryById, editEntryHandler);

  // page('*', function (ctx, next){
  //   // debugger
  //   // ctx.state.scrollPosition = ctx.state.scrollPosition || 0;
  //   // setTimeout(function(){
  //   //   window.scrollTo(0, ctx.state.scrollPosition);
  //   // }, 0);
  // });

  page({dispatch: true});

  if(!readCookie('styles_loaded')){
    var stylesheet = loadCSS('/css/master-styles.css', document.getElementById('load-css'));
    onloadCSS(stylesheet, function(){
      createCookie('styles_loaded', 'true', 15);
      // createCookie('styles_loaded', '', -1);
    });
  }

  // I should attach these when the entry/:id route fires and detach them when hitting any other route
  registerSwipeListener();
  arrow.registerArrowListeners(document);
}

setupRoutes();
