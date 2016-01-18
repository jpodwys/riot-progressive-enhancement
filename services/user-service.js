var promise = require('zousan');

module.exports = function(User){
  var self = this;

  self.getUserById = function(id){
    return User.findOne({
      where: {id: id}
    });
  }

  self.getUserByUsername = function(data){
    return Entry.findOne({
      where: {username: data.username}
    });
  }

  self.createUser = function(data){
    return new promise(function (resolve, reject){
      User.create({
        username: data.username,
        password: data.password
      }).then(function (user){
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
