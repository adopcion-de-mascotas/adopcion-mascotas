module.exports = (sequelize, DataTypes) => {
    const Refugio = sequelize.define('Refugio', {
        nombre: DataTypes.STRING,
        descripcion: DataTypes.TEXT,
        info: DataTypes.TEXT,
        imagen: DataTypes.STRING
    }, {
        tableName: 'refugios'
    });

    Refugio.associate = models => {
        Refugio.hasMany(models.Mascota);
        Refugio.hasOne(models.ContactoRefugio); // contacto incluye la dirección
    };

    return Refugio;
};
