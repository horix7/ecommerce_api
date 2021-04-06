
export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      collection: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.JSONB,
        allowNull: false
      }
    },
    {
      paranoid: true,
      hooks: {},
      defaultScope: {
        attributes: {
          exclude: ['deletedAt']
        }
      }
    }
  );

  return Product;
};
