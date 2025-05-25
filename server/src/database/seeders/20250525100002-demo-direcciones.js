'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('direcciones', [
      {
        calle: 'Calle Rescate 45',
        barrio: 'Centro',
        localidad: 'Madrid',
        provincia: 'Madrid',
        pais: 'España',
        codigo_postal: '28001',
        descripcion: 'Frente al parque del Retiro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        calle: 'Av. Diaz Velez 742',
        barrio: 'Villa Crespo',
        localidad: 'Buenos Aires',
        provincia: 'Buenos Aires',
        pais: 'Argentina',
        codigo_postal: '1425',
        descripcion: 'Casa amarilla con garage',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        calle: 'Rua das Flores 123',
        barrio: 'Jardim América',
        localidad: 'São Paulo',
        provincia: 'São Paulo',
        pais: 'Brasil',
        codigo_postal: '01445-000',
        descripcion: 'Edificio frente a la plaza central',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        calle: 'Baker Street 221B',
        barrio: 'Marylebone',
        localidad: 'Londres',
        provincia: 'Gran Londres',
        pais: 'Reino Unido',
        codigo_postal: 'NW1 6XE',
        descripcion: 'Famosa residencia de Sherlock Holmes',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('direcciones', null, {});
  }
};
