const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utilities/dbcon');

class GenresMovies extends Model {}

GenresMovies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'movies', key: 'id' },
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'genres', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'genresmovie',
  }
);

module.exports = GenresMovies;
