var Sequelize = require('sequelize'),
  sequelize = new Sequelize(process.env.JAWSDB_URL),

  userModel = require('./models/user-model')(sequelize, Sequelize),
  userService = new (require('./services/user-service'))(userModel),
  userBl = new (require('./bl/user-bl'))(userService),
  user = new (require('./middleware/service-wrapper'))(userBl),

  entryModel = require('./models/entry-model')(sequelize, Sequelize),
  entryService = new (require('./services/entry-service'))(entryModel),
  entryBl = new (require('./bl/entry-bl'))(entryService),
  entry = new (require('./middleware/service-wrapper'))(entryBl),

  handlers = require('./middleware/handlers');

module.exports = function(app){
  app.get('/', handlers.getIndex, handlers.execute);
  app.post('/user/authenticate', user.attemptLogin, handlers.joinOrLogin, handlers.execute);
  // app.post('/user/logout', user.getUserByUsername);
  app.post('/user', user.createAccount, handlers.joinOrLogin, handlers.execute);
  // app.put('/user/:id');
  // app.delete('/user/:id')
  app.get('/entries', entry.getEntriesByOwnerId, handlers.getEntries, handlers.execute);
  app.get('/entry/:id', entry.getEntryById, handlers.getEntry, handlers.execute);
  app.get('/entry/:id/edit', entry.getEntryById, handlers.getEditEntry, handlers.execute);
  app.get('/new', handlers.getNew, handlers.execute);
  app.post('/entry', entry.createEntry, handlers.postEntry, handlers.execute);
  app.put('/entry/:id', entry.updateEntry, handlers.putEntry, handlers.execute);
  app.delete('/entry/:id', entry.deleteEntry, handlers.deleteEntry, handlers.execute);
}
