var xhr = require('./xhr');

exports.attemptJoin = function(user){
  return xhr.post('/user')
    .accept('application/json')
    .send(user)
    .expiration(0);
}

exports.attemptLogin = function(user){
  return xhr.post('/user/authenticate')
    .accept('application/json')
    .send(user)
    .expiration(0);
}

exports.updateAccount = function(user){
  
}

exports.deleteAccount = function(user){
  
}
