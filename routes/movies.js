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

  try {
    const movies = await Movie.findAll({
      attributes: ['title', 'image', 'released'],
      where,
      order,
    });
    res.json(movies);
  } catch (e) {
    next(e.name);
  }
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
  let genresID = []; // genres ID that EXIST on the DB
  let genresName = []; // genres names that EXIST on the DB

  try {
    if (req.body.characters) {
      characters = await Character.findAll({
        where: { name: req.body.characters },
      });
    }
    if (req.body.genre) {
      (
        await Genre.findAll({
          where: { name: { [Op.in]: req.body.genre } },
        })
      ).map((g) => {
        genresID.push(g.id);
        genresName.push(g.name);
      });
    }
    let movies = await Movie.create(req.body);
    if (characters.length > 0) {
      movies.addCharacter(characters);
    }

    // Genre already exists
    if (genresID.length > 0) {
      movies.addGenre(genresID);
    }

    /**
     * Genre doesn't exist, we create it and then
     * we add the relation with this film
     */
    if (req.body.genre.length > genresName.length) {
      const genreDif = req.body.genre.filter((g) => !genresName.includes(g));
      genreDif.forEach(async (name) => {
        const gnrToCreate = await Genre.create({ name: name });
        movies.addGenre(gnrToCreate);
      });
    }
    res.json(movies);
  } catch (e) {
    return next(e.name);
  }
});

/**
 * Updates a movie by id. If characters don't exist they're set to null
 * (#) If genres don't exist they're created and a relationship between
 * movie and genre is created.
 *
 * (#) I don't like the way the code for doing this looks like,
 * but haven't been able to find a better way to do it, I.E to get an array
 * of values directly from sequelize without having to perform a loop on the
 * model that's retrieved.
 */

router.put('/:id', async (req, res, next) => {
  if (!Number(req.params.id)) return next('invalid');

  const movie = await Movie.findByPk(req.params.id);
  let character = [];
  let genresID = []; // genres ID that EXIST on the DB
  let genresName = []; // genres names that EXIST on the DB

  if (movie) {
    if (req.body.movies) {
      character = await Character.findAll({
        where: { title: req.body.characters },
      });
    }
    if (req.body.genre) {
      (
        await Genre.findAll({
          where: { name: { [Op.in]: req.body.genre } },
          raw: true,
        })
      ).map((g) => {
        genresID.push(g.id);
        genresName.push(g.name);
      });
    }

    try {
      movie.set(req.body);
      if (character.length > 0) {
        await movie.setCharacters(character);
      }

      // Genre already exists
      if (genresID.length > 0) {
        await movie.setGenres(genresID);
      }

      /**
       * Genre doesn't exist, we create it and then
       * we add the relation with this film
       */
      if (req.body.genre.length > genresName.length) {
        const genreDif = req.body.genre.filter((g) => !genresName.includes(g));
        genreDif.forEach(async (name) => {
          const gnrToCreate = await Genre.create({ name: name });
          await movie.addGenre(gnrToCreate);
        });
      }
      res.json(await movie.save());
    } catch (e) {
      next(e.name);
    }
  } else {
    res.sendStatus(404);
  }
});

router.delete('/:id', async (req, res) => {
  if (!Number(req.params.id)) return next('invalid');

  const movie = await Movie.findByPk(req.params.id);
  if (movie) {
    await movie.destroy();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
