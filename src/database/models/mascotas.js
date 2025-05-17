'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mascotas extends Model {
    static associate(models) {
      Mascotas.belongsTo(models.Direcciones, {
        foreignKey: 'direccion_id',
        as: 'direccion'
      });
      Mascotas.hasOne(models.Contactos, {
        foreignKey: 'mascota_id',
        as: 'contacto'
      });

      Mascotas.hasMany(models.Testimonio, {
        foreignKey: 'mascota_id',
        as: 'testimonios'
      });
    }
  }

  Mascotas.init({
    nombre: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    raza: DataTypes.STRING,
    tamaño: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    foto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: DataTypes.STRING,
    direccion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "direcciones",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Mascotas',
    tableName: "mascotas",
    freezeTableName: true
  });

  return Mascotas;
};