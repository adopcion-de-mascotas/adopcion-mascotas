'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('galeria_mascotas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mascotaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mascotas',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('galeria_mascotas');
  }
};
