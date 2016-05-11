var promise = require('zousan'),
  LIMIT = 20;

module.exports = function(Entry){
  var self = this;

  self.getEntries = function(data, user){
    if(data.query && data.query.q){
      return self.getEntriesByTextSearch(data, user);
    }
    else{
      return self.getEntriesByOwnerId(data, user);
    }
  }

  self.getEntriesByOwnerId = function(data, user){
    return new promise(function (resolve, reject){
      var offset = (data.query.p) ? parseInt(data.query.p, 10) - 1 : 0;
      offset *= LIMIT;
      Entry.getEntriesByOwnerId(user.id, LIMIT, offset).then(function (entries){
        entries.offset = LIMIT;
        return resolve(entries);
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.getEntriesByTextSearch = function(data, user){
    return new promise(function (resolve, reject){
      var index = (data.query.p) ? parseInt(data.query.p, 10) - 1 : 0;
      index *= LIMIT;
      var text = data.query.q.toLowerCase();
      Entry.getEntriesByTextSearch(text, user.id, index, LIMIT).then(function (entries){
        entries.offset = LIMIT;
        return resolve(entries);
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.getEntryById = function(entryId, user){
    return new promise(function (resolve, reject){
      Entry.getEntryById(entryId).then(function (entry){
        if(!entry) return reject({status: 404, message: 'Entry not found.'});
        if(!entry.isPublic && (!user || (user.id !== entry.ownerId))){
          return reject({status: 404, message: 'Entry not found.'});
        }
        entry.isOwner = (user && user.id == entry.ownerId);
        delete entry.ownerId;
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
