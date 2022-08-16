const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('characters', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: DataTypes.TEXT,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      age: {
        type: DataTypes.SMALLINT,
      },
      weight: {
        type: DataTypes.SMALLINT,
      },
      story: {
        type: DataTypes.TEXT,
      },
    }),
      await queryInterface.createTable('movies', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        image: {
          type: DataTypes.TEXT,
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        released: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        rating: {
          type: DataTypes.SMALLINT,
        },
      }),
      await queryInterface.createTable('genres', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
        },
        image: {
          type: DataTypes.TEXT,
        },
      });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('characters');
    await queryInterface.dropTable('movies');
    await queryInterface.dropTable('genres');
  },
};
