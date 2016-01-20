var promise = require('zousan');
var User = require('../models/user-model');

module.exports = function(User){
  var self = this;

  self.getUserById = function(id){
    return User.findOne({
      where: {id: id}
    });
  }

  self.getUserByUsername = function(username){
    return User.findOne({
      where: {username: username}
    });
  }

  self.createUser = function(data){
    return new promise(function (resolve, reject){
      User.create(data).then(function (user){
        resolve(user);
      }, function (err){
        reject(err);
      });
    });
  }

  self.updateUser = function(data){
    // return User.update(
    //   {
    //     username: data.username,
    //     password: data.password
    //   },{
    //     where: {id: data.id}
    //   }
    // );
  }

  self.deleteUser = function(id){
    return User.destroy({
      where: {id: id}
    });
  }

  self.attemptLogin = function(data){
    
  }
}
