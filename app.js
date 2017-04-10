require('dotenv').load();
var express = require('express'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  ejs = require('ejs'),
  app = express(),
  strictTransportSecurity = require('./middleware/strict-transport-security'),
  forceSsl = require('force-ssl-heroku'),
  jwtMW = require('express-jwt'),
  resMods = require('./middleware/response-mods'),
  AES = require('./utils/aes'),
  PORT = process.env.PORT || 3000;

// Keep the dyno awake
var http = require('http');
setInterval(function() {
  http.get('https://riot-demo.herokuapp.com');
}, 900000); // Every 15 minutes

app.disable('x-powered-by');
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(compress({threshold: '1.4kb'}));
app.use(strictTransportSecurity);
app.use(forceSsl);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(resMods.vary);
app.use(resMods.formOrAjax);
var maxAge = (process.env.NODE_ENV === 'production') ? '30d' : '0h';
app.use(express.static('assets', {maxAge: maxAge}));
app.use(jwtMW({
  secret: process.env.JWT_KEY,
  credentialsRequired: false,
  getToken: function(req){
    if(req.cookies && req.cookies.auth_token)
      return AES.decrypt(req.cookies.auth_token);
    return null;
  }
}));
require('./middleware/app-middleware')(app);
require('./routes')(app);

var server = app.listen(PORT);
