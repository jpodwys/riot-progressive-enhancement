var promise = require('zousan');

module.exports = function(con){
  con.config.namedPlaceholders = true;

  var self = this;

  var entries = [
    {id: '1', ownerId: '1', date: 1451695928417, isPublic: false, text: 'This is the first of many test entries. Hopefully I can make some good progress.'},
    {id: '2', ownerId: '2', date: 1441695928417, isPublic: true, text: 'This is the second of many test entries. This is a pretty cool demo.'},
    {id: '3', ownerId: '3', date: 1431695928417, isPublic: false, text: 'This is the third of many test entries. I\'m really enjoying riotjs and this stack.'},
    {id: '4', ownerId: '4', date: 1421695928417, isPublic: true, text: 'This is the fourth of many test entries. I\'m really excited to show this demo off.'},
    {id: '5', ownerId: '1', date: 1411695928417, isPublic: false, text: 'This is the fifth of many test entries. I think I\'ll write all my future projects like this.'}
  ];

  self.getAllEntries = function(){
    return new promise(function (resolve, reject){
      con.query('SELECT * FROM Entries', function (err, rows){
        console.log('ERR', err);
        console.log('ROWS', rows);
        return resolve(entries);
        // (err) ? reject(err) : resolve(rows);
      });
    });
  }

  self.getEntryById = function(id){
    return new promise(function (resolve, reject){
      for(var i = 0; i < entries.length; ++i){
        if(entries[i].id === id){
          return resolve(entries[i]);
        }
      }
      return reject({id: id, text: 'Entry not found'});
    });
  }

  self.createEntry = function(entry){
    return new promise(function (resolve, reject){
      entry.id = Math.random().toString(36).substr(2, 5);
      entry.date = (new Date(entry.date)).getTime();
      entry.isPublic = !!entry.isPublic;
      entries.push(entry);
      return resolve(entry.id);
    });
  }

  self.updateEntry = function(entry){
    return new promise(function (resolve, reject){
      for(var i = 0; i < entries.length; ++i){
        if(entries[i].id === entry.id){
          entry.date = (new Date(entry.date)).getTime();
          entry.isPublic = !!entry.isPublic;
          entries[i] = entry;
          return resolve(true);
        }
      }
      return reject(false);
    });
  }

  self.deleteEntry = function(id){
    return new promise(function (resolve, reject){
      for(var i = 0; i < entries.length; ++i){
        if(entries[i].id === id){
          entries.splice(i, 1);
          return resolve(true);
        }
      }
      return reject(true);
    });
  }
}
