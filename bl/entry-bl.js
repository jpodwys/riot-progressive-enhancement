var promise = require('zousan');

module.exports = function(Entry){
  var self = this;

  self.getEntriesByOwnerId = function(data, user){
    return new promise(function (resolve, reject){
      Entry.getEntriesByOwnerId(user.id, 2, 0).then(function (response){
        resolve(response);
      }, function (err){
        reject({status: 500, message: err});
      });
    });
  }

  self.getEntriesByTextSearch = function(){

  }

  self.getEntryById = function(){

  }

  self.createEntry = function(){

  }

  self.updateEntry = function(){

  }

  self.deleteEntry = function(){

  }
}
