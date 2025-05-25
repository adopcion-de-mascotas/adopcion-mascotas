'use strict';

const bcrypt = require('bcryptjs'); // para hashear las passwords (opcional)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Si querés guardar las passwords hasheadas, hacelo antes de insertarlas:
    const password1 = await bcrypt.hash('admin123', 10);
    const password2 = await bcrypt.hash('secret456', 10);
    const password3 = await bcrypt.hash('pass789', 10);

    return queryInterface.bulkInsert('admins', [
      {
        nombre: 'Carlos',
        apellido: 'González',
        email: 'carlos.gonzalez@example.com',
        password: password1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María',
        apellido: 'López',
        email: 'maria.lopez@example.com',
        password: password2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Jorge',
        apellido: 'Martínez',
        email: 'jorge.martinez@example.com',
        password: password3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ana',
        apellido: 'Pérez',
        email: 'ana.perez@example.com',
        password: password1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Luis',
        apellido: 'Fernández',
        email: 'luis.fernandez@example.com',
        password: password2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {});
  }
};
