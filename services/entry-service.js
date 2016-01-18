var promise = require('zousan');

module.exports = function(Entry){
  var self = this;

  self.getAllEntries = function(){
    return Entry.findAll({raw: true});
  }

  self.getEntryById = function(id){
    return Entry.findOne({
      where: {id: id}
    });
  }

  self.createEntry = function(data){
    return new promise(function (resolve, reject){
      Entry.create({
        owner_id: 1,
        date: (new Date(data.date)).getTime(),
        text: data.text,
        is_public: !!data.isPublic
      }).then(function (entry){
        return resolve(entry.id);
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
        is_public: !!data.isPublic
      },{
        where: {id: data.id}
      }
    );
  }

  self.deleteEntry = function(id){
    return Entry.destroy({
      where: {id: id}
    });
  }
}
