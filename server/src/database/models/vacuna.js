module.exports = (sequelize, DataTypes) => {
    const Vacuna = sequelize.define('Vacuna', {
        nombre: DataTypes.STRING
    }, { tableName: 'vacunas' });

    Vacuna.associate = models => {
        Vacuna.belongsToMany(models.Salud, {
            as: "salud_vacunas",
            through: 'SaludVacuna'
        });
    };

    return Vacuna;
};
