var Sequelize = require('sequelize'),
  db = require('./db')(Sequelize),
  user = require('./middleware/userMW')(db, Sequelize),
  entry = require('./middleware/entryMW')(db, Sequelize),
  resMods = require('./middleware/response-mods'),
  handlers = require('./middleware/handlers'),
  criticalCSS = require('./middleware/criticalCSS'),
  fs = require('fs');

module.exports = function(app){
  /* Main routes--accessible via both form submission and AJAX calls */
  app.get('/', resMods.addQueryAndParams, handlers.getIndex, handlers.execute);
  app.post('/user/authenticate', user.attemptLogin, handlers.joinOrLogin, handlers.execute);
  app.get('/user/logout', app.restrict, handlers.logout, handlers.execute);
  app.post('/user', user.createAccount, handlers.joinOrLogin, handlers.execute);
  // app.put('/user/:id');
  // app.delete('/user/:id')
  app.get('/entries', app.restrict, resMods.addQueryAndParams, entry.getEntries, handlers.getEntries, handlers.execute);
  app.get('/entry/new', app.restrict, resMods.addQueryAndParams, handlers.getNew, handlers.execute);
  app.get('/entry/:id', entry.getEntryById, resMods.addQueryAndParams, handlers.getEntry, handlers.execute);
  app.get('/entry/:id/edit', app.restrict, entry.getEntryById, handlers.getEditEntry, handlers.execute);
  app.post('/entry', app.restrict, entry.createEntry, handlers.postEntry, handlers.execute);
  app.put('/entry/:id', app.restrict, entry.updateEntry, handlers.putEntry, handlers.execute);
  app.delete('/entry/:id', app.restrict, entry.deleteEntry, handlers.deleteEntry, handlers.execute);

  /* Routes only accessible via AJAX calls */
  app.get('/getAllEntryIdsByOwnerId', app.restrict, entry.getAllEntryIdsByOwnerId, function (req, res){
    res.set({
      'Cache-Control': 'private, max-age=0, no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.send({ids: req.response});
  });

  /* Routes used for the old-school HTML5 Application Cache view */
  app.get('/manifest/appcache', function (req, res){
    fs.readFile('./assets/manifest/appcache.manifest', function (err, data){
      res.set('mime-type', 'text/cache-manifest');
      res.send(data);
      res.end();
    }); 
  });

  /* Convenience routes for development and metrics */
  app.get('/baseline', function (req, res){ res.send(200); });
  app.get('/user-count', user.getUserCount, function (req, res){ res.send({userCount: req.response}); });
  app.get('/entry-count', entry.getEntryCount, function (req, res){ res.send({entryCount: req.response}); });

  /* Route used for load testing verification */
  // app.get('/loaderio-3679bd0eee996f47e6d598640b4c785e', function (req, res){res.send('loaderio-3679bd0eee996f47e6d598640b4c785e')})

  /* Routes for automated critical path CSS generation for auth'd pages */
  app.get('/index-critical-css', criticalCSS('login-page'));
  app.get('/entries-critical-css', criticalCSS('entry-list'));
  app.get('/entry-critical-css', criticalCSS('entry-view'));
  app.get('/edit-critical-css', criticalCSS('edit-entry'));
}
