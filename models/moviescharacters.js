const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utilities/dbcon');

class MoviesCharacters extends Model {}

MoviesCharacters.init(
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
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'characters', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'moviescharacter',
  }
);

module.exports = MoviesCharacters;
