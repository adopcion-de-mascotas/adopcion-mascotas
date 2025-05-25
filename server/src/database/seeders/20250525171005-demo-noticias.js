'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('noticias', [
      {
        titulo: 'Nuevo refugio para mascotas en la ciudad',
        texto: 'Se inauguró un nuevo refugio para mascotas con capacidad para 100 animales. Contará con servicios veterinarios y espacio para adopciones.',
        fecha: new Date('2025-05-20'),
        foto: 'https://example.com/images/refugio-inauguracion.jpg',
        admin_id: 1
      },
      {
        titulo: 'Campaña de vacunación gratuita',
        texto: 'Durante todo el mes se realizará una campaña de vacunación gratuita para perros y gatos en diferentes barrios de la ciudad.',
        fecha: new Date('2025-05-15'),
        foto: 'https://example.com/images/campana-vacunacion.jpg',
        admin_id: 2
      },
      {
        titulo: 'Historias de adopción exitosas',
        texto: 'Compartimos varias historias emocionantes de adopciones recientes que cambiaron la vida de mascotas y familias.',
        fecha: new Date('2025-05-10'),
        foto: 'https://example.com/images/adopcion-exitosa.jpg',
        admin_id: 3
      },
      {
        titulo: 'Voluntariado en el refugio',
        texto: 'Se abre la convocatoria para nuevos voluntarios que quieran ayudar en las tareas diarias del refugio y acompañar a las mascotas.',
        fecha: new Date('2025-05-05'),
        foto: 'https://example.com/images/voluntariado.jpg',
        admin_id: 1
      },
      {
        titulo: 'Talleres para cuidado de mascotas',
        texto: 'Próximamente se realizarán talleres gratuitos sobre cuidado y educación para mascotas, dictados por expertos veterinarios.',
        fecha: new Date('2025-04-30'),
        foto: 'https://example.com/images/talleres-mascotas.jpg',
        admin_id: 2
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('noticias', null, {});
  }
};
