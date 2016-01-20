var promise = require('zousan');

module.exports = function(Entry){
  var self = this;

  self.getEntriesByOwnerId = function(userId, index, offset){
    return Entry.findAndCountAll({
      where: {ownerId: userId},
      order: [['date', 'DESC']],
      limit: offset,
      offset: 0,
      raw: true
    });
  }

  self.getAllEntries = function(){
    return Entry.findAll({raw: true});
  }

  self.getEntryById = function(id){
    return Entry.findOne({
      where: {id: id}
    });
  }

  self.createEntry = function(data, ownerId){
    return new promise(function (resolve, reject){
      console.log('DATE INPUT', data.date, typeof data.date);
      console.log('DATE OUTPUT', (new Date(data.date)).getTime());
      Entry.create({
        ownerId: ownerId,
        date: (new Date(data.date)).getTime(),
        text: data.text,
        isPublic: (!!data.isPublic) ? 1 : 0
      }).then(function (entry){
        return resolve(entry);
      }, function (err){
        return reject(err);
      });
    });
  }

  self.updateEntry = function(data){
    return Entry.update(
      {
        date: (new Date(data.date)).getTime(),
        text: data.text,
        isPublic: (!!data.isPublic) ? 1 : 0
      },{
        where: {id: data.id}
      }
    );
  }

  self.deleteEntry = function(entryId){
    return Entry.destroy({
      where: {id: entryId}
    });
  }
}
