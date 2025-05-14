'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.hasMany(models.Usuarios, {
        foreignKey: 'rol_id',
        as: 'usuarios'
      });
    }
  }
  Roles.init({
    nombre: DataTypes.STRING,
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: "roles",
    freezeTableName: true
  });
  return Roles;
};