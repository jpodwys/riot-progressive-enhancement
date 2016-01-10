var express = require('express'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  ejs = require('ejs'),
  // stream = require('express-stream'),
  app = express(),
  resMods = require('./middleware/response-mods'),
  entryService = require('./services/entry-service'),
  entry = new (require('./middleware/service-wrapper'))(entryService),
  handlers = require('./middleware/handlers'),
  PORT = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(compress());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(resMods.vary);
app.use(resMods.formOrAjax);
app.use(express.static('assets'/*, {maxAge: '1h'}*/));
app.use(express.static('views'));

app.get('/', /*entry.getAllEntries, */handlers.getIndex);
app.get('/entry/:id', entry.getEntryById, handlers.getEntry);
app.get('/entry/:id/edit', entry.getEntryById, handlers.getEditEntry);
app.get('/new', handlers.getNew);
app.post('/entry', entry.createEntry, handlers.postEntry);
app.put('/entry/:id', entry.updateEntry, handlers.putEntry);
app.delete('/entry/:id', entry.deleteEntry, handlers.deleteEntry);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
});
