'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('refugios', [
      {
        nombre: 'Patitas Felices',
        descripcion: 'Refugio especializado en perros grandes.',
        info: 'Desde 2010 ayudando a perros como Max.',
        imagen: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?auto=format&fit=crop&w=200&q=80',
        direccion_id: 1
      },
      {
        nombre: 'Huellas del Corazón',
        descripcion: 'Un refugio que acoge animales maltratados.',
        info: 'Más de 500 adopciones realizadas desde su apertura.',
        imagen: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=200&q=80',
        direccion_id: 2
      },
      {
        nombre: 'Amigos Peludos',
        descripcion: 'Refugio de gatos y perros con necesidades especiales.',
        info: 'Nos enfocamos en casos de salud complejos.',
        imagen: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=200&q=80',
        direccion_id: 3
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('refugios', null, {});
  }
};
