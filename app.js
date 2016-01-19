var empty = require('dotenv').load(),
  express = require('express'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  ejs = require('ejs'),
  // stream = require('express-stream'),
  app = express(),
  forceSsl = require('force-ssl-heroku'),
  resMods = require('./middleware/response-mods'),
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

require('./routes')(app);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
});
