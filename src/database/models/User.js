module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            lastname: {
                type: DataTypes.STRING
            },
            dni: {
                type: DataTypes.INTEGER
            },
            profilePhoto: {
                type: DataTypes.STRING
            },
            birthdate: {
                type: DataTypes.DATE
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            range: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: "users",
            timestamps: false
        }
    );
    return User;
}