'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SaludVacuna', [
      { saludId: 1, vacunaId: 1 },
      { saludId: 1, vacunaId: 3 },
      { saludId: 2, vacunaId: 2 },
      { saludId: 2, vacunaId: 4 },
      { saludId: 3, vacunaId: 1 },
      { saludId: 3, vacunaId: 5 },
      { saludId: 4, vacunaId: 7 },
      { saludId: 5, vacunaId: 6 },
      { saludId: 5, vacunaId: 8 },
      { saludId: 6, vacunaId: 3 },
      { saludId: 7, vacunaId: 9 },
      { saludId: 8, vacunaId: 10 },
      { saludId: 8, vacunaId: 14 },
      { saludId: 9, vacunaId: 13 },
      { saludId: 10, vacunaId: 15 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SaludVacuna', null, {});
  }
};
