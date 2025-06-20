'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Direcciones extends Model {
    static associate(models) {
      // Relación con Refugio (1:1)
      Direcciones.hasOne(models.Refugio, {
        foreignKey: 'direccion_id',
        as: 'refugio'
      });
    }
  }

  Direcciones.init({
    calle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    barrio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Argentina'
    },
    codigo_postal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Direcciones',
    tableName: "direcciones",
    freezeTableName: true,
    timestamps: true
  });

  return Direcciones;
};