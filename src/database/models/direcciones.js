'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direcciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Direcciones.hasOne(models.Usuarios, {
        foreignKey: 'direccion_id',
        as: 'usuario'
      });
    }
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