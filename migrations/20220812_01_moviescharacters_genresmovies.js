const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    queryInterface.createTable('moviescharacters', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'movies', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      character_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'characters', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
    queryInterface.createTable('genresmovies', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'movies', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'genres', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },
  down: ({ context: queryInterface }) => {
    queryInterface.dropTable('moviescharacters');
    queryInterface.dropTable('genresmovies');
  },
};
