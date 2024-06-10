module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            lastname: {
                type: DataTypes.STRING
            },
            dni: {
                type: DataTypes.STRING
            },
            profilePhoto: {
                type: DataTypes.STRING
            },
            birthdate: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            range: {
                type: DataTypes.STRING
            },
        },
        {
            timestamps: false
        }
    )
    return User;
}