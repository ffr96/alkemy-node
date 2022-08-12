const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utilities/dbcon');

/**
 *  Imagen: _text_
 *  Nombre: _text_
 *  Edad: _int_
 *  Peso: _int_
 *  Historia: _text_
 *  Películas o series asociadas: _text_
 */

class Character extends Model {}
Character.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'character',
  }
);

module.exports = Character;
