const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('countries', {
    id: {
      type: DataTypes.STRING(3),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imageFlag:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING,
    },
    area:{
      type: DataTypes.INTEGER,
    },
    population:{
      type: DataTypes.INTEGER,
    },
    activity_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,/* 
    freezeTableName: true,
    tableName: 'Country', */
  });
};
