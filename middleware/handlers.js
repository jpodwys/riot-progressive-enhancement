var entryService = require('../services/entry-service'),
  riot = require('riot'),
  entryList = require('../assets/tags/entry-list.tag'),
  entryView = require('../assets/tags/entry-view.tag'),
  newEntry = require('../assets/tags/new-entry.tag'),
  editEntry = require('../assets/tags/edit-entry.tag');

function entryPostForm(req, res, data){
  res.redirect('/entry/' + data);
}

function entryPostAjax(req, res, data){
  res.send({id: data});
}

function entryPutForm(req, res, data){
  res.redirect('/entry/' + req.body.id);
}

function entryPutAjax(req, res, data){
  res.status(200).send('ok');
}

function entryDeleteForm(req, res, data){
  res.redirect('/');
}

function entryDeleteAjax(req, res, data){
  res.status(200).send('ok');
}

exports.getIndex = function(req, res){
  entryService.getAllEntries().then(function (response){
    res.formOrAjax(
      function(){ res.render('wrapper', {tag: riot.render(entryList, {entries: response})}); },
      function(){ res.send(response); }
    );
  });
}

exports.getEntry = function(req, res){
  entryService.getEntryById(req.params.id).then(function (response){
    res.formOrAjax(
      function(){ res.render('wrapper', {tag: riot.render(entryView, {entry: response})}); },
      function(){ res.send(response); }
    );
  });
}

exports.getEditEntry = function(req, res){
  entryService.getEntryById(req.params.id).then(function (response){
    res.formOrAjax(
      function(){ res.render('wrapper', {tag: riot.render(editEntry, {entry: response})}); },
      function(){ res.send(response); }
    );
  });
}

exports.getNew = function(req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(newEntry)}); },
    function(){ res.status(200).send('ok'); }
  );
}

exports.postEntry = function(req, res){
  entryService.createEntry(req.body.text).then(function (response){
    res.formOrAjax(entryPostForm, entryPostAjax, response);
  });
}

exports.putEntry = function(req, res){
  entryService.updateEntry(req.params.id, req.body.text).then(function (response){
    res.formOrAjax(entryPutForm, entryPutAjax, response);
  });
}

exports.deleteEntry = function(req, res){
  entryService.deleteEntry(req.params.id).then(function (response){
    res.formOrAjax(entryDeleteForm, entryDeleteAjax, response);
  });
}
