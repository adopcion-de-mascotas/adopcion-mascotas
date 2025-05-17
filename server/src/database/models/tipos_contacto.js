'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TipoContactos extends Model {
    static associate(models) {
      TipoContactos.hasMany(models.Contactos, {
        foreignKey: 'tipo_id',
        as: 'contactos'
      });
    }
  }

  TipoContactos.init({
    nombre: DataTypes.STRING,
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'TipoContactos',
    tableName: "tipo_contactos",
    freezeTableName: true
  });

  return TipoContactos;
};
