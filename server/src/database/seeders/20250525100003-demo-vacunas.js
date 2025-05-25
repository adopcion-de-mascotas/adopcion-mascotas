'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vacunas', [
      { nombre: 'Parvovirus Canino' },
      { nombre: 'Moquillo Canino' },
      { nombre: 'Rabia' },
      { nombre: 'Leptospirosis' },
      { nombre: 'Hepatitis Canina' },
      { nombre: 'Parainfluenza' },
      { nombre: 'Coronavirus Canino' },
      { nombre: 'Gripe Canina' },
      { nombre: 'Vacuna contra la tos de las perreras' },
      { nombre: 'Leucemia Felina' },
      { nombre: 'Panleucopenia Felina' },
      { nombre: 'Calicivirus Felino' },
      { nombre: 'Rinotraqueitis Felina' },
      { nombre: 'Rabia Felina' },
      { nombre: 'Vacuna Triple Felina (RCP)' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vacunas', null, {});
  }
};
