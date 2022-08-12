const express = require('express');
const { Genre, Movie } = require('../models');
const router = express.Router();

router.get('/', async (_req, res) => {
  const genres = await Genre.findAll({ where: {}, include: Movie });
  if (genres) return res.json(genres);
  return res.sendStatus(404);
});

router.post('/', async (req, res) => {
  const genre = await Genre.create(req.body);
  res.json(genre);
});

module.exports = router;
