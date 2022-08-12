const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../../models');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const sRounds = 10;

  try {
    const passwordHash = await bcrypt.hash(password, sRounds);
    const user = await User.create({ username, passwordHash });
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: 'Invalid input or already in use' });
  }
});

module.exports = router;
