var riot = require('riot'),
  loginPage = require('../assets/tags/login-page.tag'),
  entryList = require('../assets/tags/entry-list.tag'),
  entryView = require('../assets/tags/entry-view.tag'),
  newEntry = require('../assets/tags/new-entry.tag'),
  editEntry = require('../assets/tags/edit-entry.tag');

/* Final Handler */

exports.execute = function(req, res){
  var hd = req.handlerData || {};
  hd.responseMod = hd.responseMod || function(resp){return resp;};
  res.formOrAjax(
    function(){
      if(req.response || req.response === false){ // False here means form did execute data but nothing was returned
        if(hd.redirectUrl) res.redirect(hd.redirectUrl);
        else res.render('wrapper', {tag: riot.render(hd.riotTag, hd.responseMod(req.response))});
      }
      else if(req.err){
        res.render('wrapper', {tag: riot.render(hd.riotTag, {err: req.err})});
      }
      else{
        res.render('wrapper', {tag: riot.render(hd.riotTag)});
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
        res.status(204).send();
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
  if(req.response) {}// Generate JWT and set as cookie
  next();
}

/* Entry Handlers */

exports.getEntries = function(req, res, next){
  req.handlerData = {
    riotTag: entryList,
    responseMod: function(resp){return {entries: resp.rows, entryCount: resp.count}}
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
