var riot = require('riot'),
  entryList = require('../assets/tags/entry-list.tag'),
  entryView = require('../assets/tags/entry-view.tag'),
  newEntry = require('../assets/tags/new-entry.tag'),
  editEntry = require('../assets/tags/edit-entry.tag');

var entries = [
  {id: '1', text: 'This is the first of many test entries. Hopefully I can make some good progress.'},
  {id: '2', text: 'This is the second of many test entries. Hopefully I can make some good progress.'},
  {id: '3', text: 'This is the third of many test entries. Hopefully I can make some good progress.'},
  {id: '4', text: 'This is the fourth of many test entries. Hopefully I can make some good progress.'},
  {id: '5', text: 'This is the fifth of many test entries. Hopefully I can make some good progress.'}
];

function getEntryById(id){
  for(var i = 0; i < entries.length; ++i){
    if(entries[i].id === id){
      return entries[i];
    }
  }
  return {id: id, text: 'Entry not found'};
}

function createEntry(text){
  var entryId = Math.random().toString(36).substr(2, 5);
  entries.push({id: entryId, text: text});
  return entryId;
}

function updateEntry(id, text){
  for(var i = 0; i < entries.length; ++i){
    if(entries[i].id === id){
      entries[i].text = text;
      return true;
    }
  }
  return false;
}

function deleteEntry(id){
  for(var i = 0; i < entries.length; ++i){
    if(entries[i].id === id){
      entries.splice(i, 1);
      return true;
    }
  }
  return false;
}

function indexGetForm(req, res){
  res.render('wrapper', {tag: riot.render(entryList, {entries: entries})});
}

function indexGetAjax(req, res){
  res.send(entries);
}

function entryGetForm(req, res){
  res.render('wrapper', {tag: riot.render(entryView, {entry: getEntryById(req.params.id)})});
}

function entryGetAjax(req, res){
  res.send(getEntryById(req.params.id));
}

function entryEditGetForm(req, res){
  res.render('wrapper', {tag: riot.render(editEntry, {entry: getEntryById(req.params.id)})});
}

function entryEditGetAjax(req, res){
  res.send(getEntryById(req.params.id));
}

function newGetForm(req, res){
  res.render('wrapper', {tag: riot.render(newEntry)});
}

function newGetAjax(req, res){
  res.send({});
}

function entryPostForm(req, res){
  if(req.body && req.body.text){
    var entryId = createEntry(req.body.text);
    res.redirect('/entry/' + entryId);
  }
  else{
    res.redirect('/new');
  }
}

function entryPostAjax(req, res){
  if(req.body && req.body.text){
    var entryId = createEntry(req.body.text);
    res.send({id: entryId});
  }
  else{
    res.status(500).send('Sorry, something went wrong.');
  }
}

function entryPutForm(req, res){
  if(req.body && req.body.id && req.body.text){
    updateEntry(req.body.id, req.body.text);
    res.redirect('/entry/' + req.body.id);
  }
  else{
    res.redirect('/');
  }
}

function entryPutAjax(req, res){
  if(req.body && req.body.id && req.body.text){
    updateEntry(req.body.id, req.body.text);
    res.status(200).send('ok');
  }
  else{
    res.status(500).send('Sorry, something went wrong.');
  }
}

function entryDeleteForm(req, res){
  if(req.body && req.body.id){
    deleteEntry(req.body.id);
    res.redirect('/');
  }
  else{
    res.redirect('/');
  }
}

function entryDeleteAjax(req, res){
  if(req.body && req.body.id){
    deleteEntry(req.body.id);
    res.status(200).send('ok');
  }
  else{
    res.status(500).send('Sorry, something went wrong.');
  }
}

exports.getIndex = function(req, res){
  res.formOrAjax(indexGetForm, indexGetAjax);
}

exports.getEntry = function(req, res){
  res.formOrAjax(entryGetForm, entryGetAjax);
}

exports.getEditEntry = function(req, res){
  res.formOrAjax(entryEditGetForm, entryEditGetAjax);
}

exports.getNew = function(req, res){
  res.formOrAjax(newGetForm, newGetAjax);
}

exports.postEntry = function(req, res){
  res.formOrAjax(entryPostForm, entryPostAjax);
}

exports.putEntry = function(req, res){
  res.formOrAjax(entryPutForm, entryPutAjax);
}

exports.deleteEntry = function(req, res){
  res.formOrAjax(entryDeleteForm, entryDeleteAjax);
}
