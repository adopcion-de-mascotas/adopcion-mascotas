'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mascotas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mascotas.hasMany(models.Solicitudes_adopcion, {
        foreignKey: 'mascota_id',
        as: 'solicitudes'
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
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Mascotas',
    tableName: "mascotas",
    freezeTableName: true
  });
  return Mascotas;
};