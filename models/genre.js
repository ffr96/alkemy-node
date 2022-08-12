const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utilities/dbcon');

/**
 *
 * Nombre: _text_
 * Imagen: _text_
 * Películas o series asociadas: _int_
 */

class Genre extends Model {}
Genre.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'genre',
  }
);

module.exports = Genre;
