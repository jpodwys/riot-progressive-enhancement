var promise = require('zousan');

module.exports = function(Entry, sequelize){
  var self = this;

  self.getEntriesByOwnerId = function(userId, index, offset){
    return Entry.findAndCountAll({
      where: {ownerId: userId},
      attributes: [
        'id', 'ownerId', 'date', 'isPublic',
        [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'],
        [sequelize.fn('LEFT', sequelize.col('text'), 140), 'text']
        // [sequelize.fn('CONCAT',
        //   sequelize.fn('LEFT', sequelize.col('text'), 140),
        //   sequelize.fn('IF', 
        //     sequelize.fn('LENGTH', sequelize.col('text')),
        //   > 140, "...", "")),
        // 'text']
      ],
      order: [
        ['date', 'DESC'],
        ['created_at', 'DESC']
      ],
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
      where: {id: id},
      attributes: [
        'id', 'ownerId', 'isPublic',
        [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'],
      ]
    });
  }

  self.createEntry = function(data, ownerId){
    return new promise(function (resolve, reject){
      Entry.create({
        ownerId: ownerId,
        date: data.date,
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
        date: data.date,
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
