'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    static associate(models) {
      Admins.hasMany(models.Noticias, {
        foreignKey: 'admin_id',
        as: 'noticias'
      });

      Admins.hasMany(models.Testimonio, {
        foreignKey: 'admin_id',
        as: 'testimonios'
      });
    }
  }
  Admins.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Admins',
    tableName: "admins",
    freezeTableName: true
  });
  return Admins;
};
