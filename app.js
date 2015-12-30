var express = require('express'),
  bodyParser = require('body-parser'),
  superagent = require('superagent'),
  ejs = require('ejs'),
  stream = require('express-stream'),
  riot = require('riot');
  app = express(),
  PORT = process.env.PORT || 3000;

var entryList = require('./assets/tags/entry-list.tag'),
  entryView = require('./assets/tags/entry-view.tag'),
  newEntry = require('./assets/tags/new-entry.tag');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('assets'));
app.use(express.static('views'));

var entries = [
  {id: '1', text: 'This is the first of many test entries. Hopefully I can make some good progress.'},
  {id: '2', text: 'This is the second of many test entries. Hopefully I can make some good progress.'},
  {id: '3', text: 'This is the third of many test entries. Hopefully I can make some good progress.'},
  {id: '4', text: 'This is the fourth of many test entries. Hopefully I can make some good progress.'},
  {id: '5', text: 'This is the fifth of many test entries. Hopefully I can make some good progress.'}
];

function vary(req, res, next){
  res.set({'Vary': 'Accept'});
  next();
}

function formOrAjax(req, res, next){
  res.formOrAjax = function(form, ajax){
    var fn = (req.xhr || req.headers.accept.indexOf('json') > -1) ? ajax : form;
    fn();
  }
  next();
}

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

app.get('/', vary, formOrAjax, function (req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(entryList, {entries: entries})}); },
    function(){ res.send(entries); }
  );
});

app.get('/entry/:id', vary, formOrAjax, function (req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(entryView, {entry: getEntryById(req.params.id)})}); },
    function(){ res.send(getEntryById(req.params.id)); }
  );
});

app.get('/new', vary, formOrAjax, function (req, res){
  res.formOrAjax(
    function(){ res.render('wrapper', {tag: riot.render(newEntry)}); },
    function(){ res.send({}); }
  );
});

app.post('/new', vary, formOrAjax, function (req, res){
  res.formOrAjax(
    function(){
      if(req.body && req.body.text){
        var entryId = createEntry(req.body.text);
        res.redirect('/entry/' + entryId);
      }
      else{
        res.redirect('/new');
      }
    },
    function(){
      if(req.body && req.body.text){
        var entryId = createEntry(req.body.text);
        res.send({id: entryId});
      }
      else{
        res.status(500).send('Sorry, something went wrong.');
      }
    }
  );
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
});
