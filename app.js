var empty = require('dotenv').load(),
  express = require('express'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  ejs = require('ejs'),
  // stream = require('express-stream'),
  app = express(),
  
  Sequelize = require('sequelize'),
  sequelize = new Sequelize(process.env.JAWSDB_URL),

  userModel = require('./models/user-model')(sequelize, Sequelize),
  userService = new (require('./services/user-service'))(userModel),
  user = new (require('./middleware/service-wrapper'))(userService),

  entryModel = require('./models/entry-model')(sequelize, Sequelize),
  entryService = new (require('./services/entry-service'))(entryModel),
  entry = new (require('./middleware/service-wrapper'))(entryService),

  forceSsl = require('force-ssl-heroku'),
  resMods = require('./middleware/response-mods'),
  handlers = require('./middleware/handlers'),
  PORT = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(compress());
app.use(forceSsl);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(resMods.vary);
app.use(resMods.formOrAjax);
app.use(express.static('assets'/*, {maxAge: '1h'}*/));
app.use(express.static('views'));

app.get('/', handlers.getIndex);
// app.post('/user/authenticate');
app.post('/user', user.createUser, handlers.createUser);
app.get('/entries', entry.getAllEntries, handlers.getEntries);
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
