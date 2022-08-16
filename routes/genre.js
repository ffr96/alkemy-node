const express = require('express');
const { Genre, Movie } = require('../models');
const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const genres = await Genre.findAll({ where: {}, include: Movie });
    if (genres) return res.json(genres);
    return res.sendStatus(404);
  } catch (e) {
    console.log(e);
    next(e.name);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const genre = await Genre.bulkCreate(req.body);
    res.json(genre);
  } catch (e) {
    console.log(e);
    next(e.name);
  }
});

module.exports = router;
