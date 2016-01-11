var riot = require('riot'),
  entryList = require('../assets/tags/entry-list.tag'),
  entryView = require('../assets/tags/entry-view.tag'),
  newEntry = require('../assets/tags/new-entry.tag'),
  editEntry = require('../assets/tags/edit-entry.tag');

exports.getIndex = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(entryList, {entries: req.response})}); },
    function(){ console.log('INDEX CALLED'); res.status(200).send(req.response); console.log('INDEX DONE'); }
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
