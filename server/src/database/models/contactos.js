'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contactos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contactos.belongsTo(models.TipoContactos, {
        foreignKey: 'tipo_id',
        as: 'tipo'
      });

      Contactos.belongsTo(models.Mascotas, {
        foreignKey: 'mascota_id',
        as: 'mascota'
      });

    }
  }
  Contactos.init({
    nombres: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    email: DataTypes.STRING,
    red_social: DataTypes.STRING,
    tipo_id: DataTypes.INTEGER,
    mascota_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mascotas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Contactos',
  });
  return Contactos;
};