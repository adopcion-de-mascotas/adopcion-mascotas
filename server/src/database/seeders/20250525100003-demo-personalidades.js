'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('personalidades', [
      { nombre: 'Juguetón', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Tranquilo', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Protector', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Cariñoso', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Independiente', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Tímido', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Sociable', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('personalidades', null, {});
  }
};
