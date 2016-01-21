var promise = require('zousan');

module.exports = function(Entry){
  var self = this;

  self.getEntriesByOwnerId = function(data, user){
    return new promise(function (resolve, reject){
      Entry.getEntriesByOwnerId(user.id, 20, 0).then(function (entries){
        return resolve(entries);
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.getEntriesByTextSearch = function(){

  }

  self.getEntryById = function(entryId, user){
    return new promise(function (resolve, reject){
      Entry.getEntryById(entryId).then(function (entry){
        if(!entry) return reject({status: 404, message: 'Entry not found.'});
        if(!entry.isPublic && (!user || (user.id !== entry.ownerId))){
          return reject({status: 404, message: 'Entry not found.'});
        }
        return resolve(entry);
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.createEntry = function(data, user){
    return new promise(function (resolve, reject){
      Entry.createEntry(data, user.id).then(function (entry){
        return resolve(entry.id);
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.updateEntry = function(data, user){
    return new promise(function (resolve, reject){
      Entry.getEntryById(data.id).then(function (entry){
        if(!entry) return reject({status: 404, message: 'Entry not found.'});
        if(user.id !== entry.ownerId) return reject({status: 404, message: 'Entry not found.'});
        Entry.updateEntry(data).then(function (response){
          return resolve();
        }, function (err){
          return reject(err);
        });
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.deleteEntry = function(entryId, user){
    return new promise(function (resolve, reject){
      Entry.getEntryById(entryId).then(function (entry){
        if(!entry) return reject({status: 404, message: 'Entry not found.'});
        if(user.id !== entry.ownerId) return reject({status: 404, message: 'Entry not found.'});
        Entry.deleteEntry(entryId).then(function (response){
          return resolve();
        }, function (err){
          return reject(err);
        });
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }
}
