module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define(
        "Color",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false
        }
    );
    return Color;
}