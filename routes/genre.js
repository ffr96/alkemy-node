const express = require('express');
const { Genre, Movie } = require('../models');
const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const genres = await Genre.findAll({ where: {}, include: Movie });
    if (genres) return res.json(genres);
    return res.sendStatus(404);
  } catch (e) {
    next(e.name);
  }
});

router.delete('/:id', async (req, res, next) => {
  if (!Number(req.params.id)) return next('invalid');

  try {
    await Genre.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (e) {
    next(e.name);
  }
});

module.exports = router;
