'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitudes_adopcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Solicitudes_adopcion.belongsTo(models.Usuarios, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });

      Solicitudes_adopcion.belongsTo(models.Mascotas, {
        foreignKey: 'mascota_id',
        as: 'mascota'
      });
    }
  }
  Solicitudes_adopcion.init({
    usuario_id: DataTypes.INTEGER,
    mascota_id: DataTypes.INTEGER,
    fecha_solicitud: DataTypes.DATE,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Solicitudes_adopcion',
    tableName: "solicitudes_adopcion",
    freezeTableName: true
  });
  return Solicitudes_adopcion;
};