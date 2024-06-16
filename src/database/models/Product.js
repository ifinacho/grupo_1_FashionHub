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
            categoryId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Category",
                    key: "id"
                }
            },
            colorId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Color",
                    key: "id"
                }
            },
            sizeId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Size",
                    key: "id"
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "User",
                    key: "id"
                }
            }

        }, {
        timestamps: false
    }
    );
    Product.associate = function (models) {
        Product.belongsTo(models.Product, {
            as: "users",
            foreignKey: 'productId'
        });
        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "categoryId"
        });
        Product.belongsTo(models.Color, {
            as: "colors",
            foreignKey: "colorId"
        });
        Product.belongsTo(models.Size, {
            as: "sizes",
            foreignKey: "sizeId"
        });
    };
    return Product;
};