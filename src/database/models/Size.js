module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define(
        "Size",
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
    return Size;
}