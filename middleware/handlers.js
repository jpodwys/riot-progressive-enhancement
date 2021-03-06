var riot = require('riot'),
  loginPage = require('../assets/tags/login-page.tag'),
  entryList = require('../assets/tags/entry-list.tag'),
  pagination = require('../assets/tags/pagination.tag'),
  entryView = require('../assets/tags/entry-view.tag'),
  newEntry = require('../assets/tags/new-entry.tag'),
  editEntry = require('../assets/tags/edit-entry.tag'),
  jwt = require('jsonwebtoken'),
  AES = require('../utils/aes');

/* Final Handler */

exports.execute = function(req, res){
  res.set({
    'Cache-Control': 'private, max-age=0, no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  var jsPath = 'bundle';
  if(req.body && req.body.query && req.body.query.bloat) jsPath = 'bloated-bundle';
  if(req.body && req.body.query && req.body.query.debug) jsPath = 'debug-bundle';
  var csr = (req.body && req.body.query && req.body.query.csr);
  var form = (req.headers.accept && req.headers.accept.indexOf('json') === -1);
  var appcache = (req.body && req.body.query && req.body.query.appcache);
  var hd = req.handlerData || {};
  hd.responseMod = hd.responseMod || function(resp){return resp;};

  var ejsObj = {
    view: hd.view,
    jsPath: jsPath,
    loggedIn: !!req.user,
    stylesLoaded: (req.cookies && req.cookies.styles_loaded)
  }

  if(csr){
    res.formOrAjax(
      function(){
        ejsObj.tag = '';
        return res.render('wrapper', ejsObj);
      },
      function(){
        // return res.send(400);
      }
    );
  }
  if(csr && form) return;
  res.formOrAjax(
    function(){
      if(hd.view === 'login-page' && ejsObj.loggedIn){
        res.redirect(hd.redirectUrl);
      }
      if(req.response || req.response === false){ // False here means form did execute data but nothing was returned
        if(hd.redirectUrl) res.redirect(hd.redirectUrl);
        else{
          ejsObj.tag = riot.render(hd.riotTag, hd.responseMod(req.response));
          res.render('wrapper', ejsObj);
        }
      }
      else if(req.err){
        ejsObj.tag = riot.render(hd.riotTag, {err: req.err});
        res.status(req.err.status);
        res.render('wrapper', ejsObj);
      }
      else{
        ejsObj.tag = riot.render(hd.riotTag);
        if(appcache && hd.view === 'new-entry') res.render('webapp-wrapper', ejsObj);
        else res.render('wrapper', ejsObj);
      }
    },
    function(){
      if(req.response){
        res.status(200).send(hd.responseMod(req.response));
      }
      else if(req.err){
        res.status(req.err.status).send(req.err);
      }
      else{
        res.sendStatus(204);
      }
    }
  );
}

/* Index Handler */

exports.getIndex = function(req, res, next){
  req.handlerData = {
    view: 'login-page',
    riotTag: loginPage,
    redirectUrl: '/entries'
  }
  next();
}

/* User Handlers */

exports.joinOrLogin = function(req, res, next){
  req.handlerData = {
    view: 'login-page',
    riotTag: loginPage,
    redirectUrl: '/entries'
  }
  if(req.response){
    var token = jwt.sign(req.response, process.env.JWT_KEY, {expiresIn: '30d'});
    if(req.response.id) delete req.response.id;
    // This cookie proves a user is logged in and contains JWT claims
    res.cookie('auth_token', AES.encrypt(token), {
      httpOnly: (process.env.NODE_ENV === 'production'),
      secure: (process.env.NODE_ENV === 'production'),
      expires: (new Date((new Date()).getTime() + (60 * 60 * 1000 * 24 * 30))) // One week
    });
    // This cookie contains no data. It is solely for the client to determine things about the UI
    res.cookie('logged_in', 'true', {
      secure: (process.env.NODE_ENV === 'production'),
      expires: (new Date((new Date()).getTime() + (60 * 60 * 1000 * 24 * 30))) // One week
    });
  }
  next();
}

exports.logout = function(req, res, next){
  req.response = false;
  req.handlerData = {
    view: 'login-page',
    redirectUrl: '/'
  }
  res.clearCookie('auth_token');
  res.clearCookie('logged_in');
  next();
}

/* Entry Handlers */

exports.getEntries = function(req, res, next){
  req.handlerData = {
    view: 'entry-list',
    riotTag: entryList,
    responseMod: function(resp){return {entries: resp.rows, ids: resp.ids, entryCount:resp.ids.length, offset: resp.offset, query: req.query}}
  }
  next();
}

exports.getEntry = function(req, res, next){
  req.handlerData = {
    view: 'entry-view',
    riotTag: entryView,
    responseMod: function(resp){return {entry: resp}}
  }
  next();
}

exports.getEditEntry = function(req, res, next){
  req.handlerData = {
    view: 'edit-entry',
    riotTag: editEntry,
    responseMod: function(resp){return {entry: resp}}
  }
  next();
}

exports.getNew = function(req, res, next){
  req.handlerData = {
    view: 'new-entry',
    riotTag: newEntry,
    responseMod: function(resp){return {entry: {date: new Date().getTime()}}}
  }
  next();
}

exports.postEntry = function(req, res, next){
  req.handlerData = {
    redirectUrl: '/entry/' + req.response,
    responseMod: function(resp){return {id: resp}}
  }
  next();
}

exports.putEntry = function(req, res, next){
  req.handlerData = {
    redirectUrl: '/entry/' + req.body.id
  }
  next();
}

exports.deleteEntry = function(req, res, next){
  req.handlerData = {
    redirectUrl: '/entries'
  }
  next();
}
