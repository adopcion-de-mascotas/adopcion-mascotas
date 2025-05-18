'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Noticias extends Model {
    static associate(models) {
      // Asociación con Admins
      Noticias.belongsTo(models.Admins, {
        foreignKey: 'admin_id',
        as: 'admin'
      });
    }
  }

  Noticias.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    foto: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'admins',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Noticias',
    tableName: 'noticias',
    freezeTableName: true
  });

  return Noticias;
};