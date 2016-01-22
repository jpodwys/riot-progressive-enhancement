var xhr = require('superagent');

exports.attemptJoin = function(user){
  return xhr.post('/user')
    .accept('application/json')
    .send(user);
}

exports.attemptLogin = function(user){
  return xhr.post('/user/authenticate')
    .accept('application/json')
    .send(user);
}

exports.updateAccount = function(entry){
  
}

exports.deleteAccount = function(entry){
  
}
