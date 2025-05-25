'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comportamientos', [
      {
        niños: 'Excelente',
        perros: 'Bueno',
        gatos: 'No probado',
        apartamento: 'Sí',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        niños: 'Bueno',
        perros: 'Excelente',
        gatos: 'Bueno',
        apartamento: 'No',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        niños: 'Regular',
        perros: 'Regular',
        gatos: 'Malo',
        apartamento: 'Sí',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        niños: 'Excelente',
        perros: 'Excelente',
        gatos: 'Excelente',
        apartamento: 'Sí',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        niños: 'Malo',
        perros: 'Bueno',
        gatos: 'Bueno',
        apartamento: 'No',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        niños: 'Bueno',
        perros: 'Malo',
        gatos: 'Regular',
        apartamento: 'Sí',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        niños: 'Regular',
        perros: 'Excelente',
        gatos: 'No probado',
        apartamento: 'Sí',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        niños: 'Excelente',
        perros: 'Bueno',
        gatos: 'Bueno',
        apartamento: 'No',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        niños: 'Bueno',
        perros: 'Bueno',
        gatos: 'Excelente',
        apartamento: 'Sí',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        niños: 'No probado',
        perros: 'No probado',
        gatos: 'No probado',
        apartamento: 'No',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comportamientos', null, {});
  }
};
