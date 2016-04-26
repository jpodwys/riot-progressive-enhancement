var promise = require('zousan');
var bcrypt = require('bcrypt');

module.exports = function(User){
  var self = this;

  self.attemptLogin = function(data){
    return new promise(function (resolve, reject){
      User.getUserByUsername(data.username).then(function (user){
        if(!user) return reject({status: 400, message: 'Invalid username/password combination'});
        bcrypt.compare(data.password, user.password, function (err, res){
          if(err) return reject({status: 500, message: err});
          if(!res) return reject({status: 400, message: 'Invalid username/password combination'});
          var output = {id: user.id, username: user.username};
          return resolve(output);
        });
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.logout = function(){

  }

  self.createAccount = function(data){
    return new promise(function (resolve, reject){
      if(!data.username || !data.password) reject({status: 400, message: 'Username and password are both required'});
      // if(!) username and password should both be several characters minimum
      User.getUserByUsername(data.username).then(function (user){
        if(user) return reject({status: 400, message: 'Username ' + data.username + ' is taken. Please try another.'});
        bcrypt.genSalt(10, function (err, salt){
          bcrypt.hash(data.password, salt, function (err, hash){
            var userData = {username: data.username, password: hash};
            User.createUser(userData).then(function (user){
              if(!user) return reject({status: 500, message: 'Failed to created account'});
              var output = {id: user.id, username: user.username};
              return resolve(output);
            }, function (err){
              return reject({status: 500, message: err});
            });
          });
        });
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.updateAccount = function(data){
    // Make sure the current user is the correct user
    // return User.update(
    //   {
    //     username: data.username,
    //     password: data.password
    //   },{
    //     where: {id: data.id}
    //   }
    // );
  }

  self.deleteAccount = function(id){
    // Make sure the current user is the correct user
    // return User.destroy({
    //   where: {id: id}
    // });
  }
}
