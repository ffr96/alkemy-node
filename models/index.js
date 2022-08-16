const Genre = require('./genre');
const Character = require('./character');
const Movie = require('./movie');
const User = require('./user');
const GenresMovies = require('./genresmovies');
const MoviesCharacters = require('./moviescharacters');
//const { sequelize } = require('../utilities/dbcon');

Movie.belongsToMany(Character, {
  through: MoviesCharacters,
  onDelete: 'CASCADE',
  hooks: true,
});
Character.belongsToMany(Movie, {
  through: MoviesCharacters,
  onDelete: 'CASCADE',
  hooks: true,
});
Genre.belongsToMany(Movie, {
  through: GenresMovies,
  onDelete: 'CASCADE',
  hooks: true,
});
Movie.belongsToMany(Genre, {
  through: GenresMovies,
  onDelete: 'CASCADE',
  hooks: true,
});

// Now migrations take care of updating the sequelize models.

//Character.sync({ alter: true });
//Genre.sync({ alter: true });
//Movie.sync({ alter: true });
//User.sync({ alter: true });
//sequelize.sync();

module.exports = { Character, Movie, Genre, User };
