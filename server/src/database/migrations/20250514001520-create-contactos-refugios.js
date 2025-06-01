'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacto_refugios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: false // Haciendo campo obligatorio
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // Haciendo campo obligatorio
        validate: {
          isEmail: true // Validación de formato email
        }
      },
      web: {
        type: Sequelize.STRING,
        allowNull: true, // Web es opcional
        validate: {
          isUrl: true // Validación de URL si se proporciona
        }
      },
      refugio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Relación 1:1 con Refugio
        references: {
          model: 'refugios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // Eliminado direccion_id (se mueve a Refugio)
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

    // Índice único para refugio_id (alternativa a unique: true)
    await queryInterface.addIndex('contacto_refugios', ['refugio_id'], {
      unique: true,
      name: 'unique_contacto_refugio'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar índice primero
    await queryInterface.removeIndex('contacto_refugios', 'unique_contacto_refugio');

    // Luego eliminar la tabla
    await queryInterface.dropTable('contacto_refugios');
  }
};