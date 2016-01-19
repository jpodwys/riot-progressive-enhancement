var promise = require('zousan');

module.exports = function(Entry){
  var self = this;

  self.getEntriesByOwnerId = function(data, user){
    return new promise(function (resolve, reject){
      Entry.getEntriesByOwnerId(user.id, 2, 0).then(function (entries){
        resolve(entries);
      }, function (err){
        reject({status: 500, message: err});
      });
    });
  }

  self.getEntriesByTextSearch = function(){

  }

  self.getEntryById = function(entryId, user){
    return new promise(function (resolve, reject){
      Entry.getEntryById(entryId).then(function (entry){
        if(!entry) return reject({status: 404, message: 'Entry not found.'});
        if(user.id === entry.owner_id || entry.is_public === 1){
          return resolve(entry);
        }
        else{
          return reject({status: 404, message: 'Entry not found.'});
        }
      }, function (err){
        reject({status: 500, message: err});
      });
    });
  }

  self.createEntry = function(){

  }

  self.updateEntry = function(){

  }

  self.deleteEntry = function(){

  }
}
