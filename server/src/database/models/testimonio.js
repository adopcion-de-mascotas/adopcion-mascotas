'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonio extends Model {
    static associate(models) {
      Testimonio.belongsTo(models.Mascota, {
        foreignKey: 'mascota_id',
        as: 'mascota'
      });

      Testimonio.belongsTo(models.Admins, {
        foreignKey: 'admin_id',
        as: 'admin'
      });
    }
  }

  Testimonio.init({
    comentario: DataTypes.TEXT,
    autor: DataTypes.STRING,
    fecha: DataTypes.DATE,
    foto: DataTypes.STRING(500),
    mascota_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Testimonio',
    tableName: "testimonios",
    freezeTableName: true
  });

  return Testimonio;
};