module.exports = (sequelize, DataTypes) => {
    const ContactoRefugio = sequelize.define('ContactoRefugio', {
        telefono: DataTypes.STRING,
        email: DataTypes.STRING,
        web: DataTypes.STRING,
        refugio_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'refugios',
                key: 'id'
            }
        },
        direccion_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'direcciones',
                key: 'id'
            }
        }
    }, {
        tableName: 'contacto_refugios'
    });

    ContactoRefugio.associate = models => {
        ContactoRefugio.belongsTo(models.Refugio, {
            foreignKey: 'refugio_id',
            as: 'refugio'
        });

        ContactoRefugio.belongsTo(models.Direcciones, {
            foreignKey: 'direccion_id',
            as: 'direccion'
        });
    };

    return ContactoRefugio;
};
