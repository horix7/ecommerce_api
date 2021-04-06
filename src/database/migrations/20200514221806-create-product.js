export const up = (queryInterface, Sequelize) =>
  queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT
    }, 
    collection: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      allowNull: false,
      type: Sequelize.INTEGER
      
    },
    imageUrl: {
      allowNull: false,
      type: Sequelize.JSONB
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  });

export const down = queryInterface => queryInterface.dropTable('Products');
