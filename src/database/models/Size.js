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
            tableName: "sizes",
            timestamps: false
        }
    );
    return Size;
}