var promise = require('zousan');

var entries = [
  {id: '1', date: '1451695928417', isPublic: 0, text: 'This is the first of many test entries. Hopefully I can make some good progress.'},
  {id: '2', date: '1451695928417', isPublic: 0, text: 'This is the second of many test entries. Hopefully I can make some good progress.'},
  {id: '3', date: '1451695928417', isPublic: 0, text: 'This is the third of many test entries. Hopefully I can make some good progress.'},
  {id: '4', date: '1451695928417', isPublic: 0, text: 'This is the fourth of many test entries. Hopefully I can make some good progress.'},
  {id: '5', date: '1451695928417', isPublic: 0, text: 'This is the fifth of many test entries. Hopefully I can make some good progress.'}
];

exports.getAllEntries = function(){
  return new promise(function (resolve, reject){
    resolve(entries);
  });
}

exports.getEntryById = function(id){
  return new promise(function (resolve, reject){
    for(var i = 0; i < entries.length; ++i){
      if(entries[i].id === id){
        resolve(entries[i]);
      }
    }
    reject({id: id, text: 'Entry not found'});
  });
}

exports.createEntry = function(text){
  return new promise(function (resolve, reject){
    var entryId = Math.random().toString(36).substr(2, 5);
    entries.push({id: entryId, text: text});
    resolve(entryId);
  });
}

exports.updateEntry = function(id, text){
  return new promise(function (resolve, reject){
    for(var i = 0; i < entries.length; ++i){
      if(entries[i].id === id){
        entries[i].text = text;
        resolve(true);
      }
    }
    reject(false);
  });
}

exports.deleteEntry = function(id){
  return new promise(function (resolve, reject){
    for(var i = 0; i < entries.length; ++i){
      if(entries[i].id === id){
        entries.splice(i, 1);
        resolve(true);
      }
    }
    reject(false);
  });
}
