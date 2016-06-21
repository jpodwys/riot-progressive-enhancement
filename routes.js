var Sequelize = require('sequelize'),
  db = require('./db')(Sequelize),
  user = require('./middleware/userMW')(db, Sequelize),
  entry = require('./middleware/entryMW')(db, Sequelize),
  resMods = require('./middleware/response-mods'),
  handlers = require('./middleware/handlers');

module.exports = function(app){
  app.get('/baseline', function (req, res){
    res.send(200);
  });
  app.get('/', resMods.addQueryAndParams, handlers.getIndex, handlers.execute);
  app.post('/user/authenticate', user.attemptLogin, handlers.joinOrLogin, handlers.execute);
  app.get('/user/logout', app.restrict, handlers.logout, handlers.execute);
  app.post('/user', user.createAccount, handlers.joinOrLogin, handlers.execute);
  // app.put('/user/:id');
  // app.delete('/user/:id')
  app.get('/entries', app.restrict, resMods.addQueryAndParams, entry.getEntries, handlers.getEntries, handlers.execute);
  app.get('/entry/new', app.restrict, handlers.getNew, handlers.execute);
  app.get('/entry/:id', entry.getEntryById, resMods.addQueryAndParams, handlers.getEntry, handlers.execute);
  app.get('/entry/:id/edit', app.restrict, entry.getEntryById, handlers.getEditEntry, handlers.execute);
  app.post('/entry', app.restrict, entry.createEntry, handlers.postEntry, handlers.execute);
  app.put('/entry/:id', app.restrict, entry.updateEntry, handlers.putEntry, handlers.execute);
  app.delete('/entry/:id', app.restrict, entry.deleteEntry, handlers.deleteEntry, handlers.execute);
}
