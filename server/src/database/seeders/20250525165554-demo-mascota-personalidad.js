'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mascota_personalidad', [
      { mascotaId: 1, personalidadId: 1 },
      { mascotaId: 1, personalidadId: 3 },
      { mascotaId: 2, personalidadId: 2 },
      { mascotaId: 2, personalidadId: 4 },
      { mascotaId: 3, personalidadId: 1 },
      { mascotaId: 3, personalidadId: 5 },
      { mascotaId: 4, personalidadId: 3 },
      { mascotaId: 5, personalidadId: 2 },
      { mascotaId: 6, personalidadId: 4 },
      { mascotaId: 7, personalidadId: 1 },
      { mascotaId: 8, personalidadId: 5 },
      { mascotaId: 9, personalidadId: 3 },
      { mascotaId: 10, personalidadId: 2 },
      { mascotaId: 11, personalidadId: 4 },
      { mascotaId: 12, personalidadId: 5 },
      { mascotaId: 13, personalidadId: 1 },
      { mascotaId: 14, personalidadId: 3 },
      { mascotaId: 15, personalidadId: 2 },
      { mascotaId: 16, personalidadId: 4 },
      { mascotaId: 17, personalidadId: 5 }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mascota_personalidad', null, {});
  }
};
