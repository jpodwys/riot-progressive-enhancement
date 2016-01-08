var riot = require('riot'),
  entryList = require('../assets/tags/entry-list.tag'),
  entryView = require('../assets/tags/entry-view.tag'),
  newEntry = require('../assets/tags/new-entry.tag'),
  editEntry = require('../assets/tags/edit-entry.tag');

exports.getIndex = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(entryList, {server: true, entries: req.response})}); },
    function(){ res.send(req.response); }
  );
}

exports.getEntry = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(entryView, {server: true, entry: req.response})}); },
    function(){ res.send(req.response); }
  );
}

exports.getEditEntry = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(editEntry, {server: true, entry: req.response})}); },
    function(){ res.send(response); }
  );
}

exports.getNew = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(newEntry, {server: true, entry: {date: new Date().getTime()}})}); },
    function(){ res.status(200).send('ok'); }
  );
}

exports.postEntry = function(req, res){
  res.formOrAjax(
    function(){ res.redirect('/entry/' + req.response); },
    function(){ res.send({id: req.response}); }
  );
}

exports.putEntry = function(req, res){
  res.formOrAjax(
    function(){ res.redirect('/entry/' + req.body.id); },
    function(){ res.status(200).send('ok'); }
  );
}

exports.deleteEntry = function(req, res){
  res.formOrAjax(
    function(){ res.redirect('/'); },
    function(){ res.status(200).send('ok'); }
  );
}
