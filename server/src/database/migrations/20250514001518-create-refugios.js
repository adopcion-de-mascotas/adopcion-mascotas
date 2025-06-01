'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refugios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false // Agregado allowNull false para campo obligatorio
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false // Agregado allowNull false para campo obligatorio
      },
      info: {
        type: Sequelize.TEXT,
        allowNull: true // Explícito que puede ser null
      },
      imagen: {
        type: Sequelize.STRING,
        allowNull: true // Explícito que puede ser null
      },
      direccion_id: {  // Nuevo campo para la relación 1:1
        type: Sequelize.INTEGER,
        allowNull: true, // Temporalmente permitido para migración
        references: {
          model: 'direcciones',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Crear índice único para garantizar relación 1:1
    await queryInterface.addIndex('refugios', {
      fields: ['direccion_id'],
      unique: true,
      name: 'unique_refugio_direccion'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar el índice primero
    await queryInterface.removeIndex('refugios', 'unique_refugio_direccion');

    // Luego eliminar la tabla
    await queryInterface.dropTable('refugios');
  }
};