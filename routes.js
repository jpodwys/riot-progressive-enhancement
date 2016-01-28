var Sequelize = require('sequelize'),
  sequelize = new Sequelize(process.env.JAWSDB_URL, {omitNull: true/*, logging: (process.env.NODE_ENV === 'development')*/}),

  userModel = require('./models/user-model')(sequelize, Sequelize),
  userService = new (require('./services/user-service'))(userModel, sequelize),
  userBl = new (require('./bl/user-bl'))(userService),
  user = new (require('./middleware/service-wrapper'))(userBl),

  entryModel = require('./models/entry-model')(sequelize, Sequelize),
  entryService = new (require('./services/entry-service'))(entryModel, sequelize),
  entryBl = new (require('./bl/entry-bl'))(entryService),
  entry = new (require('./middleware/service-wrapper'))(entryBl),

  handlers = require('./middleware/handlers');

function addQueryAndParams(req, res, next){
  if(req.body && req.query) req.body.query = req.query;
  if(req.body && req.params) req.body.params = req.params;
  next();
}

module.exports = function(app){
  app.get('/', handlers.getIndex, handlers.execute);
  app.post('/user/authenticate', user.attemptLogin, handlers.joinOrLogin, handlers.execute);
  app.get('/user/logout', app.restrict, handlers.logout, handlers.execute);
  app.post('/user', user.createAccount, handlers.joinOrLogin, handlers.execute);
  // app.put('/user/:id');
  // app.delete('/user/:id')
  app.get('/entries', app.restrict, addQueryAndParams, entry.getEntries, handlers.getEntries, handlers.execute);
  app.get('/entry/new', app.restrict, handlers.getNew, handlers.execute);
  app.get('/entry/:id', entry.getEntryById, handlers.getEntry, handlers.execute);
  app.get('/entry/:id/edit', app.restrict, entry.getEntryById, handlers.getEditEntry, handlers.execute);
  app.post('/entry', app.restrict, entry.createEntry, handlers.postEntry, handlers.execute);
  app.put('/entry/:id', app.restrict, entry.updateEntry, handlers.putEntry, handlers.execute);
  app.delete('/entry/:id', app.restrict, entry.deleteEntry, handlers.deleteEntry, handlers.execute);
}
