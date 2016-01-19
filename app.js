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
  userBl = new (require('./bl/user-bl'))(userService),
  user = new (require('./middleware/service-wrapper'))(userBl),

  entryModel = require('./models/entry-model')(sequelize, Sequelize),
  entryService = new (require('./services/entry-service'))(entryModel),
  entryBl = new (require('./bl/entry-bl'))(entryService),
  entry = new (require('./middleware/service-wrapper'))(entryBl),

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
app.use(function(req, res, next){req.user = {id: 1}; next();});

app.get('/', handlers.getIndex, handlers.execute);
app.post('/user/authenticate', user.attemptLogin, handlers.joinOrLogin, handlers.execute);
// app.post('/user/logout', user.getUserByUsername);
app.post('/user', user.createAccount, handlers.joinOrLogin, handlers.execute);
// app.put('/user/:id');
// app.delete('/user/:id')
app.get('/entries', entry.getEntriesByOwnerId, handlers.getEntries, handlers.execute);
// app.get('/entry/:id', entry.getEntryById, handlers.getEntry);
// app.get('/entry/:id/edit', entry.getEntryById, handlers.getEditEntry);
// app.get('/new', handlers.getNew);
// app.post('/entry', entry.createEntry, handlers.postEntry);
// app.put('/entry/:id', entry.updateEntry, handlers.putEntry);
// app.delete('/entry/:id', entry.deleteEntry, handlers.deleteEntry);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
});
