module.exports = function(sequelize, Sequelize){
  return sequelize.define('User',
    {
      id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
      username: {type: Sequelize.STRING, unique: true},
      salt: Sequelize.STRING,
      password: Sequelize.STRING
    },{
      timestamps: false,
      classMethods: {

      },
      instanceMethods: {

      }
    }
  );
}
