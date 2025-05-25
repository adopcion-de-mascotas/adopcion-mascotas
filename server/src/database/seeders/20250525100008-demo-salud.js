'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('salud', [
      {
        estado: "Bueno",
        tratamiento: "Ninguno",
        info_veterinaria: "El animal se encuentra en buen estado general, sin problemas de salud detectados.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estado: "Recuperación",
        tratamiento: "Antibióticos por 10 días",
        info_veterinaria: "Presentó infección respiratoria leve, se está medicando y monitoreando.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estado: "Crónico",
        tratamiento: "Dieta especial y medicación diaria",
        info_veterinaria: "Sufre de problemas renales, se requiere cuidado constante.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estado: "Bueno",
        tratamiento: "Vacunado y desparasitado",
        info_veterinaria: "Sin antecedentes de enfermedades, vacunas al día.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estado: "En tratamiento",
        tratamiento: "Medicamentos para alergias",
        info_veterinaria: "Alergia cutánea leve, bajo control veterinario.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estado: "Regular",
        tratamiento: "Suplementos vitamínicos",
        info_veterinaria: "Recuperación tras cirugía menor, requiere seguimiento.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estado: "Bueno",
        tratamiento: "Ninguno",
        info_veterinaria: "Animal sano, sin patologías activas.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estado: "En tratamiento",
        tratamiento: "Inyecciones antiinflamatorias",
        info_veterinaria: "Lesión articular leve, en proceso de recuperación.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estado: "Crónico",
        tratamiento: "Medicamentos para tiroides",
        info_veterinaria: "Hipotiroidismo controlado con medicación diaria.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estado: "Bueno",
        tratamiento: "Vacunas de refuerzo programadas",
        info_veterinaria: "Salud general óptima, controles veterinarios regulares.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('salud', null, {});
  }
};
