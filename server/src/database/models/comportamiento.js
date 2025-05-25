module.exports = (sequelize, DataTypes) => {
    const Comportamiento = sequelize.define('Comportamiento', {
        niños: DataTypes.STRING,
        perros: DataTypes.STRING,
        gatos: DataTypes.STRING,
        apartamento: DataTypes.STRING
    }, { tableName: 'comportamientos' });

    Comportamiento.associate = models => {
        Comportamiento.hasOne(models.Mascota);
    };

    return Comportamiento;
};
