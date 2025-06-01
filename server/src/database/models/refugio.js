module.exports = (sequelize, DataTypes) => {
    const Refugio = sequelize.define('Refugio', {
        nombre: DataTypes.STRING,
        descripcion: DataTypes.TEXT,
        info: DataTypes.TEXT,
        imagen: DataTypes.STRING,
        direccion_id: {  // Nueva foreign key directa
            type: DataTypes.INTEGER,
            references: {
                model: 'direcciones',
                key: 'id'
            },
            unique: true  // Para relación 1:1
        }
    }, {
        tableName: 'refugios'
    });

    Refugio.associate = models => {
        Refugio.hasMany(models.Mascota, {
            as: "mascotas",
            foreignKey: "refugioId"
        });

        Refugio.hasOne(models.ContactoRefugio, {
            as: "contacto",
            foreignKey: "refugio_id"
        });

        // Nueva relación directa con Direcciones
        Refugio.belongsTo(models.Direcciones, {
            foreignKey: 'direccion_id',
            as: 'direccion'
        });
    };

    return Refugio;
};