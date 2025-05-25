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
      allowNull: true  // OK si el nombre puede faltar
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true  // OK si puede faltar
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,     // Recomendación: asegurar emails únicos
      validate: {
        isEmail: true  // Validación para que sea email válido
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Admins',
    tableName: "admins",
    freezeTableName: true,
    timestamps: true   // Recomiendo tener createdAt / updatedAt para auditoría
  });
  return Admins;
};
