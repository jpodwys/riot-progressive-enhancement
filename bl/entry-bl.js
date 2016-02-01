var promise = require('zousan'),
  AES = require('../utils/aes'),
  INDEX = 0,
  OFFSET = 20;

function getEncryptedIndex(words){
  words = words.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ');
  words = words.replace(/(\r\n|\n|\r)/gm, ' ');
  words = words.replace(/\s{2,}/g, ' ');
  words = words.toLowerCase();
  words = words.split(' ');
  words = words.map(function (word){
    if(word.length) return AES.encrypt(word + process.env.AES_SALT);
    return null;
  });
  return words.join('');
}

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
      Entry.getEntriesByOwnerId(user.id, INDEX, OFFSET).then(function (entries){
        entries.rows = entries.rows.map(function (entry){
          entry.text = AES.decrypt(entry.text);
          if(entry.text.length > 140) entry.text = entry.text.slice(0, 139) + '...';
          return entry;
        });
        return resolve(entries);
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.getEntriesByTextSearch = function(data, user){
    return new promise(function (resolve, reject){
      var text = getEncryptedIndex(data.query.q);
      Entry.getEntriesByTextSearch(text, user.id, INDEX, OFFSET).then(function (entries){
        entries.rows = entries.rows.map(function (entry){
          entry.text = AES.decrypt(entry.text);
          if(entry.text.length > 140) entry.text = entry.text.slice(0, 139) + '...';
          return entry;
        });
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
        entry.text = AES.decrypt(entry.text);
        return resolve(entry);
      }, function (err){
        return reject({status: 500, message: err});
      });
    });
  }

  self.createEntry = function(data, user){
    return new promise(function (resolve, reject){
      data.wordIndex = getEncryptedIndex(data.text);
      data.text = AES.encrypt(data.text);
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
        data.wordIndex = getEncryptedIndex(data.text);
        data.text = AES.encrypt(data.text);
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
