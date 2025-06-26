'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('noticias', [
      {
        titulo: 'Nuevo refugio para mascotas en la ciudad',
        texto: 'Se inauguró un nuevo refugio para mascotas con capacidad para 100 animales. Contará con servicios veterinarios y espacio para adopciones.',
        fecha: new Date('2025-05-20'),
        foto: 'https://media.istockphoto.com/id/1211334914/es/foto/vista-superior-de-dos-patas-de-perro-en-la-mano-del-propietario.webp?a=1&b=1&s=612x612&w=0&k=20&c=6D5DET5ARtjzSMNwj488zbix-7a3elFGYHSZKWVAUf8=',
        admin_id: 1
      },
      {
        titulo: 'Campaña de vacunación gratuita',
        texto: 'Durante todo el mes se realizará una campaña de vacunación gratuita para perros y gatos en diferentes barrios de la ciudad.',
        fecha: new Date('2025-05-15'),
        foto: 'https://plus.unsplash.com/premium_photo-1677166331454-b58e2b2355b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ0fHx8ZW58MHx8fHx8',
        admin_id: 2
      },
      {
        titulo: 'Historias de adopción exitosas',
        texto: 'Compartimos varias historias emocionantes de adopciones recientes que cambiaron la vida de mascotas y familias.',
        fecha: new Date('2025-05-10'),
        foto: 'https://plus.unsplash.com/premium_photo-1681843750412-b6abbce5630c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGN1aWRhZG8lMjBtYXNjb3Rhc3xlbnwwfHwwfHx8MA%3D%3D',
        admin_id: 3
      },
      {
        titulo: 'Voluntariado en el refugio',
        texto: 'Se abre la convocatoria para nuevos voluntarios que quieran ayudar en las tareas diarias del refugio y acompañar a las mascotas.',
        fecha: new Date('2025-05-05'),
        foto: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        admin_id: 1
      },
      {
        titulo: 'Talleres para cuidado de mascotas',
        texto: 'Próximamente se realizarán talleres gratuitos sobre cuidado y educación para mascotas, dictados por expertos veterinarios.',
        fecha: new Date('2025-04-30'),
        foto: 'https://images.unsplash.com/photo-1581888475780-27b6b0bc3690?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3VpZGFkbyUyMG1hc2NvdGFzfGVufDB8fDB8fHww',
        admin_id: 2
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('noticias', null, {});
  }
};
