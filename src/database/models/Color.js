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
            tableName: "colors",
            timestamps: false
        }
    );
    return Color;
}