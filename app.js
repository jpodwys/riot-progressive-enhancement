var express = require('express'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  superagent = require('superagent'),
  ejs = require('ejs'),
  stream = require('express-stream'),
  app = express(),
  resMods = require('./middleware/response-mods');
  handlers = require('./middleware/handlers');
  PORT = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(resMods.vary);
app.use(resMods.formOrAjax);
app.use(express.static('assets'));
app.use(express.static('views'));

app.get('/', handlers.getIndex);
app.get('/entry/:id', handlers.getEntry);
app.get('/entry/:id/edit', handlers.getEditEntry);
app.get('/new', handlers.getNew);
app.post('/entry', handlers.postEntry);
app.put('/entry', handlers.putEntry);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
});
