var promise = require('zousan');

module.exports = function(Entry, sequelize){
  var self = this;

  self.getEntriesByOwnerId = function(userId, limit, offset){
    return Entry.findAndCountAll({
      where: {ownerId: userId},
      attributes: [
        'id', 'date', 'text', 'isPublic',
        [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'],
        [sequelize.fn('CONCAT',
          sequelize.fn('LEFT', sequelize.col('text'), 140),
          sequelize.fn('IF', 
            sequelize.literal('LENGTH(text) > 140'),
          "...", "")),
        'text']
      ],
      order: [
        ['date', 'DESC'],
        ['updated_at', 'DESC']
      ],
      limit: limit,
      offset: offset,
      raw: true
    });
  }

  self.getEntriesByTextSearch = function(text, userId, index, offset){
    return new promise(function (resolve, reject){
      var totalQuery =    'SELECT COUNT(*) ' +
                          'FROM ( ' +
                            'SELECT id, date_format(date, "%Y-%m-%d") AS date, text, updated_at ' +
                            'FROM entries ' +
                            'WHERE owner_id = :ownerId ' +
                          ') AS subQuery ' +
                          'WHERE LOWER(text) LIKE :text;';
      var entriesQuery =  'SELECT id, date, ' +
                            'IF(LENGTH(text) > 140, CONCAT(LEFT(text, 140), "..."), text) AS text ' +
                          'FROM ( ' +
                            'SELECT id, owner_id AS ownerId, date_format(date, "%Y-%m-%d") AS date, text, updated_at ' +
                            'FROM entries ' +
                            'WHERE owner_id = :ownerId ' +
                          ') AS subQuery ' +
                          'WHERE LOWER(text) LIKE :text ' +
                          'ORDER BY date DESC, updated_at DESC ' +
                          'LIMIT :index, :offset;';

      var doTotalQuery = function(){
        return sequelize.query(totalQuery, {
          replacements: {
            ownerId: userId,
            text: '%' + text + '%',
          },
          type: sequelize.QueryTypes.SELECT
        });
      }

      var doEntriesQuery = function(){
        return sequelize.query(entriesQuery, {
          replacements: {
            ownerId: userId,
            text: '%' + text + '%',
            index: index,
            offset: offset
          },
          type: sequelize.QueryTypes.SELECT
        });
      }

      promise.all([doTotalQuery(), doEntriesQuery()]).then(function (response){
        return resolve({count: response[0][0]['COUNT(*)'], rows: response[1]});
      }, function (err){
        console.log('Err', err);
        return reject(err);
      });
    });
  }

  self.getAllEntries = function(){
    return Entry.findAll({raw: true});
  }

  self.getEntryById = function(id){
    return Entry.findOne({
      where: {id: id},
      attributes: [
        'id', 'ownerId', 'text', 'isPublic',
        [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'],
      ],
      raw: true
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
    return Entry.update({
      date: data.date,
      text: data.text,
      isPublic: (!!data.isPublic) ? 1 : 0
    }, {
      where: {id: data.id}
    });
  }

  self.deleteEntry = function(entryId){
    return Entry.destroy({
      where: {id: entryId}
    });
  }
}
