var express = require('express'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  superagent = require('superagent'),
  ejs = require('ejs'),
  stream = require('express-stream'),
  app = express(),
  BL = require('./middleware/handlers');
  PORT = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(express.static('assets'));
app.use(express.static('views'));

function vary(req, res, next){
  res.set({'Vary': 'Accept'});
  next();
}

function formOrAjax(req, res, next){
  res.formOrAjax = function(form, ajax){
    var fn = (req.xhr || req.headers.accept.indexOf('json') > -1) ? ajax : form;
    fn(req, res);
  }
  next();
}

app.get('/', vary, formOrAjax, BL.getIndex);
app.get('/entry/:id', vary, formOrAjax, BL.getEntry);
app.get('/entry/:id/edit', vary, formOrAjax, BL.getEditEntry);
app.get('/new', vary, formOrAjax, BL.getNew);
app.post('/entry', vary, formOrAjax, BL.postEntry);
app.put('/entry/:id', vary, formOrAjax, BL.putEntry);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
});
