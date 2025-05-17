'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tipo_contactos', [
      {
        nombre: 'particular',
        descripcion: "Persona particular que posee a la mascota"
      },
      {
        nombre: 'ong',
        descripcion: "Organizacion sin fines de lucro que posee la mascota"
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tipo_contactos', null, {});
  }
};