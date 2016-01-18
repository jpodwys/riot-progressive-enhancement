module.exports = function(sequelize, Sequelize){
  return sequelize.define('Entry', 
    {
      id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
      owner_id: Sequelize.INTEGER,
      date: Sequelize.INTEGER,
      text: Sequelize.STRING,
      is_public: Sequelize.INTEGER
    },{
      timestamps: false,
      classMethods: {

      },
      instanceMethods: {

      }
    }
  );
}
