'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('contacto_refugios', [
      {
        telefono: '+34 911 234 567',
        email: 'info@patitasfelices.org',
        web: 'https://www.patitasfelices.org',
        direccion_id: 1,  // corresponde a Calle Rescate 45, Madrid
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        telefono: '+54 11 1234 5678',
        email: 'contacto@refugioargentina.com',
        web: 'https://www.refugioargentina.com',
        direccion_id: 2,  // Av. Siempre Viva 742, Buenos Aires
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        telefono: '+55 11 9876 5432',
        email: 'contato@refugiosaopaulo.com.br',
        web: 'https://www.refugiosaopaulo.com.br',
        direccion_id: 3,  // Rua das Flores 123, São Paulo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        telefono: '+44 20 7946 0958',
        email: 'info@sherlockrefugio.uk',
        web: 'https://www.sherlockrefugio.uk',
        direccion_id: 4,  // Baker Street 221B, Londres
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contacto_refugios', null, {});
  }
};
