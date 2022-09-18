const { DataTypes } = require('sequelize');
var {Sequelize} = require('sequelize');
const Country = require('../models/Country');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('CountryActivities'), {
    DateJoin: {
        type: Sequelize.DATE
    },
    country_id: {
      type: DataTypes.STRING(3),
      references: {
        model: Country, // 'Movies' would also work
        key: 'id'
      }
    },
    activity_id: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false
  }
}