var riot = require('riot'),
  loginPage = require('../assets/tags/login-page.tag'),
  entryList = require('../assets/tags/entry-list.tag'),
  entryView = require('../assets/tags/entry-view.tag'),
  newEntry = require('../assets/tags/new-entry.tag'),
  editEntry = require('../assets/tags/edit-entry.tag');


/* Default Handler */

exports.execute = function(req, res){
  res.formOrAjax(
    function(){
      if(req.response){
        // Generate JWT and set as cookie
        res.redirect(req.redirectUrl);
      }
      else if(req.err){
        res.render('wrapper', {tag: riot.render(req.riotTag, {err: req.err})});
      }
      else{
        res.render('wrapper', {tag: riot.render(req.riotTag)}); 
      }
    },
    function(){
      if(req.response){
        // Generate JWT and set as cookie
        res.status(200).send(req.response);
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
  req.riotTag = loginPage,
  req.redirectUrl = '/entries'
  next();
  // res.formOrAjax(
  //   function(){ res.render('wrapper', {tag: riot.render(loginPage, {err: req.err})}); },
  //   function(){ res.status(204).send(); }
  // );
}

/* User Handlers */

exports.attemptLogin = function(req, res, next){
  req.riotTag = loginPage;
  req.redirectUrl = '/entries';

  // Generate JWT and set as cookie

  next();
  // res.formOrAjax(
  //   function(){
  //     if(req.response){
  //       // Generate JWT and set as cookie
  //       res.redirect('/entries');
  //     }
  //     else if(req.err){
  //       res.render('wrapper', {tag: riot.render(loginPage, {err: req.err})});
  //     }
  //   },
  //   function(){
  //     if(req.response){
  //       // Generate JWT and set as cookie
  //       res.status(200).send(req.response);
  //     }
  //     else if(req.err){
  //       res.status(req.error.status).send(req.err.message);
  //     }
  //   }
  // );
}

exports.createAccount = function(req, res, next){
  req.riotTag = loginPage;
  req.redirectUrl = '/entries';

  // Generate JWT and set as cookie

  next();
  // res.formOrAjax(
  //   function(){
  //     if(req.response){
  //       // Generate JWT and set as cookie
  //       res.redirect('/entries');
  //     }
  //     else if(req.err){
  //       res.render('wrapper', {tag: riot.render(loginPage, {err: req.err})});
  //     }
  //   },
  //   function(){
  //     if(req.response){
  //       // Generate JWT and set as cookie
  //       res.status(200).send(req.response);
  //     }
  //     else if(req.err){
  //       res.status(req.err.status).send(req.err.message);
  //     }
  //   }
  // );
}

/* Entry Handlers */

exports.getEntries = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(entryList, {entries: req.response})}); },
    function(){ res.status(200).send(req.response); }
  );
}

exports.getEntry = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(entryView, {entry: req.response})}); },
    function(){ res.status(200).send(req.response); }
  );
}

exports.getEditEntry = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(editEntry, {entry: req.response})}); },
    function(){ res.status(200).send(req.response); }
  );
}

exports.getNew = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(newEntry, {entry: {date: new Date().getTime()}})}); },
    function(){ res.status(204).send(); }
  );
}

exports.postEntry = function(req, res){
  res.formOrAjax(
    function(){ res.redirect('/entry/' + req.response); },
    function(){ res.status(200).send({id: req.response}); }
  );
}

exports.putEntry = function(req, res){
  res.formOrAjax(
    function(){ res.redirect('/entry/' + req.body.id); },
    function(){ res.status(204).send(); }
  );
}

exports.deleteEntry = function(req, res){
  res.formOrAjax(
    function(){ res.redirect('/'); },
    function(){ res.status(204).send(); }
  );
}
