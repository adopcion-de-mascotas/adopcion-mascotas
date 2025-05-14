'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('testimonios', [
      {
        comentario: '¡Excelente servicio! Adopté a mi mascota aquí y fue una experiencia maravillosa.',
        autor: 'María González',
        fecha: new Date('2023-10-01')
      },
      {
        comentario: 'El equipo es muy profesional. Mi perro recibió la mejor atención.',
        autor: 'Juan Pérez',
        fecha: new Date('2023-10-05')
      },
      {
        comentario: 'Recomiendo este lugar a todos los amantes de los animales.',
        autor: 'Laura Sánchez',
        fecha: new Date('2023-10-10')
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('testimonios', null, {});
  }
};