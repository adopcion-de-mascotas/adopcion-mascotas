module.exports = (sequelize, DataTypes) => {
    const MascotaPersonalidad = sequelize.define('MascotaPersonalidad', {}, {
        tableName: 'mascota_personalidad',
        timestamps: false
    });

    MascotaPersonalidad.associate = models => {
        MascotaPersonalidad.belongsTo(models.Mascota, { foreignKey: 'mascotaId', as:"mascotas"});
        MascotaPersonalidad.belongsTo(models.Personalidad, { foreignKey: 'personalidadId' });
    };

    return MascotaPersonalidad;
};
