require('dotenv').load();
var express = require('express'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  ejs = require('ejs'),
  // stream = require('express-stream'),
  app = express(),
  forceSsl = require('force-ssl-heroku'),
  jwtMW = require('express-jwt'),
  resMods = require('./middleware/response-mods'),
  PORT = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(compress());
app.use(forceSsl);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(resMods.vary);
app.use(resMods.formOrAjax);
var maxAge = (process.env.NODE_ENV === 'production') ? '1d' : '0h';
app.use(express.static('assets', {maxAge: maxAge}));
app.use(express.static('views'));

app.use(jwtMW({
  secret: process.env.JWT_KEY,
  credentialsRequired: false,
  getToken: function(req){
    if(req.cookies && req.cookies.auth_token) return req.cookies.auth_token;
    return null;
  }
}));

require('./middleware/app-middleware')(app);
require('./routes')(app);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
});
