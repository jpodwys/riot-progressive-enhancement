var Sequelize = require('sequelize'),

  db = require('./db')(Sequelize),

  // sequelize = new Sequelize(process.env.DB_URL, {
  //   dialectOptions: {
  //     debug: true,
  //     ssl: {
  //       // Run this command for each SSL ENV
  //       // heroku config:set SQL_SSL_CA="$(cat ca.pem)" -a riot-demo
  //       // Run this to pull/push ENVs form heroku to .env or back
  //       // heroku config:pull -a riot-demo
  //       // heroku config:push -a riot-demo
  //       ca: process.env.SQL_SSL_CA,
  //       cert: process.env.SQL_SSL_CERT,
  //       key: process.env.SQL_SSL_KEY
  //     }
  //   },
  //   omitNull: true,
  //   logging: (process.env.NODE_ENV === 'development') ? console.log : false
  // }),

  user = require('./middleware/userMW')(db, Sequelize),

  // userModel = require('./models/user-model')(sequelize, Sequelize),
  // userService = new (require('./services/user-service'))(userModel, sequelize),
  // userBl = new (require('./bl/user-bl'))(userService),
  // user = new (require('./middleware/service-wrapper'))(userBl),

  entry = require('./middleware/entryMW')(db, Sequelize),

  // entryModel = require('./models/entry-model')(sequelize, Sequelize),
  // entryService = new (require('./services/entry-service'))(entryModel, sequelize),
  // entryBl = new (require('./bl/entry-bl'))(entryService),
  // entry = new (require('./middleware/service-wrapper'))(entryBl),

  resMods = require('./middleware/response-mods'),
  handlers = require('./middleware/handlers');

module.exports = function(app){
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
