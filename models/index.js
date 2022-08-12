const Genre = require('./genre');
const Character = require('./character');
const Movie = require('./movie');
const User = require('./user');
const { sequelize } = require('../utilities/dbcon');

Movie.belongsToMany(Character, { through: 'moviescharacters' });
Character.belongsToMany(Movie, { through: 'moviescharacters' });
Genre.belongsToMany(Movie, { through: 'genresmovies' });
Movie.belongsToMany(Genre, { through: 'genresmovies' });

Character.sync({ alter: true });
Genre.sync({ alter: true });
Movie.sync({ alter: true });
User.sync();
sequelize.sync();

module.exports = { Character, Movie, Genre, User };
