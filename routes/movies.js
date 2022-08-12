const express = require('express');
const { Op } = require('sequelize');
const { Character, Movie, Genre } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  const where = {};
  let order = [];

  if (req.query.title) {
    where.title = {
      [Op.substring]: req.query.title,
    };
  }

  if (req.query.genre) {
    where.genre = req.params.genre;
  }

  if (req.query.order) {
    order = [['released', req.query.order]];
  }

  const movies = await Movie.findAll({
    attributes: ['title', 'image', 'released'],
    where,
    order,
  });
  res.json(movies);
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const movies = await Movie.findByPk(id, {
      include: [
        { model: Character, through: { attributes: [] } },
        { model: Genre, through: { attributes: [] } },
      ],
    });
    if (movies) {
      res.json(movies);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e.name);
  }
});

/**
 * Creates a new movie.
 * If the character provided doesn't exist it'll be set to null.
 * If the genre provided doesn't exist it'll be created.
 */

router.post('/', async (req, res, next) => {
  let characters = [];
  let genre = [];
  if (req.body.characters) {
    characters = await Character.findAll({
      where: { name: req.body.characters },
    });
  }
  if (req.body.genre) {
    genre = await Genre.findAll({
      where: { name: { [Op.in]: req.body.genre } },
    });
  }

  try {
    let movies = await Movie.create(req.body);
    if (characters.length > 0) {
      movies.addCharacter(characters);
    }

    // Genre already exists
    if (genre.length > 0) {
      movies.addGenre(genre);
    }

    /**
     * Genre doesn't exist, we create it and then
     * we add the relation with this film
     */
    if (req.body.genre.length > genre.length) {
      const genreDif = req.body.genre.filter((g) => !genre.includes(g));
      genreDif.forEach(async (name) => {
        const gnrToCreate = await Genre.create(name);
        movies.addGenre(gnrToCreate);
      });
    }
    res.json(movies);
  } catch (e) {
    console.log(e);
    return next(e.name);
  }
});

module.exports = router;
