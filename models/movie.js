const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utilities/dbcon');

/**
 * -Película o Serie:
 *    Imagen: _text_
 *    Título: _text_
 *    Fecha de creación: _date_
 *    Calificación (del 1 al 5): _int_
 *    Cast
 */

class Movie extends Model {}
Movie.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'movie',
  }
);

module.exports = Movie;
