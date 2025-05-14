'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonio extends Model {
    static associate(models) {
      // define association here
    }
  }
  Testimonio.init({
    comentario: DataTypes.TEXT,
    autor: DataTypes.STRING,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Testimonio',
    tableName: "testimonios",
    freezeTableName: true
  });
  return Testimonio;
};