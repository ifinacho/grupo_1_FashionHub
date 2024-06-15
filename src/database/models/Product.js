module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            image: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            price: {
                type: DataTypes.DECIMAL
            },
            discount: {
                type: DataTypes.DECIMAL
            },
            category: {
                type: DataTypes.STRING
            },
            color: {
                type: DataTypes.STRING
            },
            size: {
                type: DataTypes.STRING
            },
        },
        {
            timestamps: false
        }
    );
    return Product;
}