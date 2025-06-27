'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('contacto_refugios', [
      {
        nombre: "Juan Díaz",
        telefono: '+54 11 4321 5678',
        email: 'contacto@refugiopatitas.org',
        web: 'https://www.refugiopatitas.org',
        refugio_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Daniel Perez",
        telefono: '+54 351 412 3456',
        email: 'info@huellascordobesas.com.ar',
        web: 'https://www.huellascordobesas.com.ar',
        refugio_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Gustavo Lopez",
        telefono: '+54 261 423 4567',
        email: 'adopciones@refugiomendoza.org',
        web: 'https://www.refugiomendoza.org',
        refugio_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contacto_refugios', null, {});
  }
};