'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SaludVacuna', {
      saludId: {
        type: Sequelize.INTEGER,
        references: { model: 'salud', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      vacunaId: {
        type: Sequelize.INTEGER,
        references: { model: 'vacunas', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('SaludVacuna');
  }
};
