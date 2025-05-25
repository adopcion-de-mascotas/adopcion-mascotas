'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mascota_personalidad', {
      mascotaId: {
        type: Sequelize.INTEGER,
        references: { model: 'mascotas', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      personalidadId: {
        type: Sequelize.INTEGER,
        references: { model: 'personalidades', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('mascota_personalidad');
  }
};
