const express = require('express');
const { Op } = require('sequelize');
const { Character, Movie } = require('../models');
const router = express.Router();

/**
 * Gets all the characters.
 */

router.get('/', async (req, res, next) => {
  const where = {};
  const movieWhere = {};

  if (req.query.name) {
    where.name = {
      [Op.substring]: req.query.name,
    };
  }
  if (req.query.age) {
    where.age = req.query.age;
  }
  if (req.query.movies) {
    movieWhere.id = req.query.movies;
  }

  try {
    const characters = await Character.findAll({
      attributes: ['name', 'image'],
      include: {
        model: Movie,
        attributes: { exclude: ['id'] },
        where: movieWhere,
        through: { attributes: [] },
      },
      where,
    });
    res.json(characters);
  } catch (e) {
    next('unexpected');
  }
});

/**
 * Finds a character by id.
 */

router.get('/:id', async (req, res) => {
  const character = await Character.findByPk(req.params.id, {
    include: {
      model: Movie,
      attributes: ['title', 'released', 'image'],
      through: { attributes: [] },
    },
  });
  if (character) {
    res.json(character);
  } else {
    res.sendStatus(404);
  }
});

/**
 * Creates a new character. If the film provided doesn't exist on the database it will be set as null.
 */

router.post('/', async (req, res, next) => {
  let movie = [];
  if (req.body.movies) {
    movie = await Movie.findAll({ where: { title: req.body.movies } });
  }
  try {
    let character = await Character.create(req.body);
    if (movie.length > 0) {
      character = await character.addMovie(movie);
    }
    res.json(character);
  } catch (e) {
    next(e.name);
  }
});

/**
 * Deletes a character by id.
 */

router.delete('/:id', async (req, res) => {
  try {
    await Character.destroy({ where: { id: req.params.id } });
    res.json({ message: `Successfully deleted ${req.params.id}` });
  } catch (e) {
    res.status(400).json({ message: 'Error while deleting' });
  }
});

/**
 * Deletes all the characters. This action doesn't drop the table, so it will be
 * still accessible after.
 */

router.delete('/', async (req, res) => {
  try {
    await Character.destroy({ truncate: true });
    res.sendStatus(200);
  } catch (e) {
    res.status(400).json({ message: 'Unable to delete all rows' });
  }
});

/**
 * Updates a character by id. If the film provided doesn't exist in the database
 * it will be set as null.
 */

router.put('/:id', async (req, res) => {
  const character = await Character.findByPk(req.params.id);
  if (character) {
    try {
      character.name = req.body.name;
      await character.save();
      res.json(character);
    } catch (e) {
      res.status(400).json({ message: 'Invalid data' });
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
