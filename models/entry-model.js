module.exports = function(sequelize, Sequelize){
  return sequelize.define('Entry', 
    {
      id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
      ownerId: {type: Sequelize.INTEGER, field: 'owner_id'},
      date: Sequelize.BIGINT,
      text: Sequelize.STRING,
      isPublic: {type: Sequelize.INTEGER, field: 'is_public'}
    },{
      timestamps: false,
      classMethods: {

      },
      instanceMethods: {

      }
    }
  );
}
