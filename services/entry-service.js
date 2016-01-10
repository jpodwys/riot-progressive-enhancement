var promise = require('zousan');

var entries = [
  {id: '1', ownerId: '1', date: 1451695928417, isPublic: false, text: 'This is the first of many test entries. Hopefully I can make some good progress.'},
  {id: '2', ownerId: '2', date: 1441695928417, isPublic: true, text: 'This is the second of many test entries. This is a pretty cool demo.'},
  {id: '3', ownerId: '3', date: 1431695928417, isPublic: false, text: 'This is the third of many test entries. I\'m really enjoying riotjs and this stack.'},
  {id: '4', ownerId: '4', date: 1421695928417, isPublic: true, text: 'This is the fourth of many test entries. I\'m really excited to show this demo off.'},
  {id: '5', ownerId: '1', date: 1411695928417, isPublic: false, text: 'This is the fifth of many test entries. I think I\'ll write all my future projects like this.'}
];

exports.getAllEntries = function(){
  return new promise(function (resolve, reject){
    console.log('getAllEntriesCalled', entries);
    return resolve(entries);
  });
}

exports.getEntryById = function(id){
  return new promise(function (resolve, reject){
    for(var i = 0; i < entries.length; ++i){
      if(entries[i].id === id){
        return resolve(entries[i]);
      }
    }
    reject({id: id, text: 'Entry not found'});
  });
}

exports.createEntry = function(entry){
  return new promise(function (resolve, reject){
    entry.id = Math.random().toString(36).substr(2, 5);
    entry.date = (new Date(entry.date)).getTime();
    entry.isPublic = !!entry.isPublic;
    entries.push(entry);
    resolve(entry.id);
  });
}

exports.updateEntry = function(entry){
  return new promise(function (resolve, reject){
    for(var i = 0; i < entries.length; ++i){
      if(entries[i].id === entry.id){
        entry.date = (new Date(entry.date)).getTime();
        entry.isPublic = !!entry.isPublic;
        entries[i] = entry;
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
        return resolve(true);
      }
    }
    reject(false);
  });
}
