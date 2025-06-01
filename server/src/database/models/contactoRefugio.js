module.exports = (sequelize, DataTypes) => {
    const ContactoRefugio = sequelize.define('ContactoRefugio', {
        nombre: DataTypes.STRING,
        telefono: DataTypes.STRING,
        email: DataTypes.STRING,
        web: DataTypes.STRING,
        refugio_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'refugios',
                key: 'id'
            },
            unique: true  // Para relación 1:1
        }
    }, {
        tableName: 'contacto_refugios'
    });

    ContactoRefugio.associate = models => {
        ContactoRefugio.belongsTo(models.Refugio, {
            foreignKey: 'refugio_id',
            as: 'refugio'
        });
    };

    return ContactoRefugio;
};