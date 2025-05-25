module.exports = (sequelize, DataTypes) => {
    const GaleriaMascota = sequelize.define('GaleriaMascota', {
        foto: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'galeria_mascotas',
        timestamps: false
    });

    GaleriaMascota.associate = models => {
        GaleriaMascota.belongsTo(models.Mascota, {
            foreignKey: 'mascotaId',
            onDelete: 'CASCADE'
        });
    };

    return GaleriaMascota;
};
