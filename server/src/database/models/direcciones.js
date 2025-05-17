'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Direcciones extends Model {
    static associate(models) {
      Direcciones.hasOne(models.Mascotas, {
        foreignKey: 'direccion_id',
        as: 'mascota'
      });
    }
  }

  Direcciones.init({
    calle: DataTypes.STRING,
    barrio: DataTypes.STRING,
    localidad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    pais: DataTypes.STRING,
    codigo_postal: DataTypes.STRING,
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Direcciones',
    tableName: "direcciones",
    freezeTableName: true
  });

  return Direcciones;
};