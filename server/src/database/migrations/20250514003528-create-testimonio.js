'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('testimonios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comentario: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: true
      },
      foto: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      mascota_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'mascotas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'admins',
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('testimonios');
  }
};
