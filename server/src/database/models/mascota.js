// models/mascota.js
module.exports = (sequelize, DataTypes) => {
  const Mascota = sequelize.define('Mascota', {
    nombre: DataTypes.STRING,
    edad: DataTypes.STRING,
    tipo: DataTypes.STRING,
    raza: DataTypes.STRING,
    genero: DataTypes.STRING,
    tamanio: DataTypes.STRING,
    peso: DataTypes.STRING,
    esterelizado: DataTypes.BOOLEAN,
    estado: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    historia: DataTypes.TEXT,
    imagen_principal: DataTypes.STRING,
    liked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'mascotas',
    timestamps: false
  });

  Mascota.associate = models => {
    // Relaciones de clave foránea
    Mascota.belongsTo(models.Refugio, {
      as: "refugio",
      foreignKey: 'refugioId',
      onDelete: 'SET NULL'
    });

    Mascota.belongsTo(models.Salud, {
      as: "salud",
      foreignKey: 'saludId',
      onDelete: 'SET NULL'
    });

    Mascota.belongsTo(models.Comportamiento, {
      as: "comportamiento",
      foreignKey: 'comportamientoId',
      onDelete: 'SET NULL'
    });

    // Relación uno a muchos con galería
    Mascota.hasMany(models.GaleriaMascota, {
      foreignKey: 'mascotaId',
      as: 'galeria',
      onDelete: 'CASCADE'
    });

    // Relación muchos a muchos con personalidad
    Mascota.belongsToMany(models.Personalidad, {
      through: 'mascota_personalidad', // nombre exacto de la tabla pivote en la DB
      foreignKey: 'mascotaId',         // columna FK hacia Mascota en la tabla pivote
      otherKey: 'personalidadId',      // columna FK hacia Personalidad en la tabla pivote
      as: 'personalidades',            // alias para la relación
    });
  };

  return Mascota;
};
