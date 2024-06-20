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
        tableName: "products",
        timestamps: false
    }
    );
    Product.associate = function (models) {
        Product.belongsTo(sequelize.models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
        Product.belongsTo(sequelize.models.Color, { foreignKey: 'colorId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
        Product.belongsTo(sequelize.models.Size, { foreignKey: 'sizeId', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
        Product.belongsTo(sequelize.models.User, { foreignKey: 'userId', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });

        sequelize.models.Category.hasMany(Product, { foreignKey: 'categoryId' });
        sequelize.models.Color.hasMany(Product, { foreignKey: 'colorId' });
        sequelize.models.Size.hasMany(Product, { foreignKey: 'sizeId' });
        sequelize.models.User.hasMany(Product, { foreignKey: 'userId' });
    };
    return Product;
};