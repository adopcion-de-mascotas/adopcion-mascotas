module.exports = (sequelize, DataTypes) => {
    const Salud = sequelize.define('Salud', {
        estado: DataTypes.STRING,
        tratamiento: DataTypes.STRING,
        info_veterinaria: DataTypes.TEXT
    }, { tableName: 'salud' });

    Salud.associate = models => {
        Salud.belongsToMany(models.Vacuna, {
            through: 'SaludVacuna'
        });
    };

    return Salud;
};
