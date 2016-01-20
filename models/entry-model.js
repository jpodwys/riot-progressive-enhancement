module.exports = function(sequelize, Sequelize){
  return sequelize.define('Entry', 
    {
      id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
      owner_id: Sequelize.INTEGER,
      date: Sequelize.INTEGER,
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
