'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mascotas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      raza: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      tamanio: {
        type: Sequelize.STRING
      },
      peso: {
        type: Sequelize.STRING
      },
      esterelizado: {
        type: Sequelize.BOOLEAN
      },
      estado: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      historia: {
        type: Sequelize.TEXT
      },
      imagen_principal: {
        type: Sequelize.STRING
      },
      liked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      refugioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'refugios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      saludId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'salud',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      comportamientoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'comportamientos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mascotas');
  }
};
