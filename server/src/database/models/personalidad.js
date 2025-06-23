module.exports = (sequelize, DataTypes) => {
    const Personalidad = sequelize.define('Personalidad', {
        nombre: DataTypes.STRING
    }, { tableName: 'personalidades' });

    Personalidad.associate = models => {
        Personalidad.belongsToMany(models.Mascota, {
            through: 'mascota_personalidad',
            foreignKey: 'personalidadId',
            otherKey: 'mascotaId',
            as: 'mascotas',
        });
    };

    return Personalidad;
};
