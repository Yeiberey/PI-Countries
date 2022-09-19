const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('activity', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false,
    //   primaryKey: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: { min: 1, max: 5 }
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    season: {
      type: DataTypes.STRING,
      defaultValue: "Not there are season"
    },/* 
    country_id: {
      type: DataTypes.STRING(3),
      allowNull: false,
    }, */
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false, /*
    freezeTableName: true,//detener la pluralización automática realizada por Sequelize usando la freezeTableName: trueopción. 
    //De esta forma, Sequelize inferirá que el nombre de la tabla es igual al nombre del modelo, sin ninguna modificación:
    tableName: 'Activity', //nombre de la tabla directamente */
  });
};
