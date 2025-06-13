'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('testimonios', [
      {
        comentario: 'Gracias a este refugio encontré a mi mejor amigo. Una experiencia maravillosa.',
        autor: 'María López',
        fecha: new Date('2023-06-15'),
        foto: 'https://randomuser.me/api/portraits/women/44.jpg',
        estrellas: 4,
        mascota_id: 1,
        admin_id: 2
      },
      {
        comentario: 'El equipo del refugio es increíble y se preocupan mucho por los animales.',
        autor: 'Carlos Pérez',
        fecha: new Date('2023-07-10'),
        foto: 'https://randomuser.me/api/portraits/men/34.jpg',
        estrellas: 5,
        mascota_id: 3,
        admin_id: 1
      },
      {
        comentario: 'Adoptar fue un proceso sencillo y muy satisfactorio. Recomiendo este lugar.',
        autor: 'Lucía Fernández',
        fecha: new Date('2023-08-01'),
        foto: 'https://randomuser.me/api/portraits/women/65.jpg',
        estrellas: 3,
        mascota_id: 5,
        admin_id: null
      },
      {
        comentario: 'Un refugio serio y comprometido con el bienestar animal.',
        autor: 'Jorge Martínez',
        fecha: new Date('2023-09-12'),
        foto: 'https://randomuser.me/api/portraits/men/55.jpg',
        estrellas: 4,
        mascota_id: null,
        admin_id: 3
      },
      {
        comentario: 'Mi familia está muy feliz con nuestra nueva mascota, gracias a todo el equipo.',
        autor: 'Ana Gómez',
        fecha: new Date('2023-10-05'),
        foto: 'https://randomuser.me/api/portraits/women/21.jpg',
        estrellas: 4,
        mascota_id: 2,
        admin_id: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('testimonios', null, {});
  }
};
