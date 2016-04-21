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
  var jsPath = (req.body && req.body.query && req.body.query.bloat) ? 'bloated-bundle' : 'bundle';
  var csr = (req.body && req.body.query && req.body.query.csr);
  var form = (req.headers.accept.indexOf('json') === -1);
  if(csr){
    res.formOrAjax(
      function(){
        return res.render('wrapper', {tag: '', jsPath: jsPath, loggedIn: !!req.user});
      },
      function(){}
    );
  }
  if(csr && form) return;
  var hd = req.handlerData || {};
  hd.responseMod = hd.responseMod || function(resp){return resp;};
  res.formOrAjax(
    function(){
      if(req.response || req.response === false){ // False here means form did execute data but nothing was returned
        if(hd.redirectUrl) res.redirect(hd.redirectUrl);
        else res.render('wrapper', {jsPath: jsPath, loggedIn: !!req.user, tag: riot.render(hd.riotTag, hd.responseMod(req.response))});
      }
      else if(req.err){
        res.render('wrapper', {jsPath: jsPath, loggedIn: !!req.user, tag: riot.render(hd.riotTag, {err: req.err})});
      }
      else{
        res.render('wrapper', {jsPath: jsPath, loggedIn: !!req.user, tag: riot.render(hd.riotTag)});
      }
    },
    function(){
      if(req.response){
        res.status(200).send(hd.responseMod(req.response));
      }
      else if(req.err){
        res.status(req.err.status).send(req.err.message);
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
    riotTag: loginPage,
    redirectUrl: '/entries'
  }
  next();
}

/* User Handlers */

exports.joinOrLogin = function(req, res, next){
  req.handlerData = {
    riotTag: loginPage,
    redirectUrl: '/entries'
  }
  if(req.response){
    var token = jwt.sign(req.response, process.env.JWT_KEY, {expiresIn: '7d'});
    if(req.response.id) delete req.response.id;
    // This cookie proves a user is logged in and contains JWT claims
    res.cookie('auth_token', AES.encrypt(token), {
      httpOnly: (process.env.NODE_ENV === 'production'),
      secure: (process.env.NODE_ENV === 'production'),
      expires: (new Date((new Date()).getTime() + (60 * 60 * 1000 * 24 * 7))) // One week
    });
    // This cookie contains no data. It is solely for the client to determine things about the UI
    res.cookie('logged_in', 'true', {
      secure: (process.env.NODE_ENV === 'production'),
      expires: (new Date((new Date()).getTime() + (60 * 60 * 1000 * 24 * 7))) // One week
    });
  }
  next();
}

exports.logout = function(req, res, next){
  req.response = false;
  req.handlerData = {
    redirectUrl: '/'
  }
  res.clearCookie('auth_token');
  res.clearCookie('logged_in');
  next();
}

/* Entry Handlers */

exports.getEntries = function(req, res, next){
  req.handlerData = {
    riotTag: entryList,
    responseMod: function(resp){return {entries: resp.rows, entryCount: resp.count, offset: resp.offset, query: req.query}}
  }
  next();
}

exports.getEntry = function(req, res, next){
  req.handlerData = {
    riotTag: entryView,
    responseMod: function(resp){return {entry: resp}}
  }
  next();
}

exports.getEditEntry = function(req, res, next){
  req.handlerData = {
    riotTag: editEntry,
    responseMod: function(resp){return {entry: resp}}
  }
  next();
}

exports.getNew = function(req, res, next){
  req.handlerData = {
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
