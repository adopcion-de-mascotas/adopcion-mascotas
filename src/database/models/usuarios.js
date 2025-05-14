'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuarios.belongsTo(models.Roles, {
        foreignKey: 'rol_id',
        as: 'rol'
      });

      Usuarios.belongsTo(models.Direcciones, {
        foreignKey: "direccion_id",
        as: "direccion"
      })

      Usuarios.hasMany(models.Solicitudes_adopcion, {
        foreignKey: 'usuario_id',
        as: 'solicitudes'
      });
    }
  }
  Usuarios.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rol_id: DataTypes.INTEGER,
    direccion_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Usuarios',
    tableName: "usuarios",
    freezeTableName: true
  });
  return Usuarios;
};