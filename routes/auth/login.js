const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../../models');
const { SECRET } = require('../../utilities/config');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const user = await User.findOne({ where: { username: username } });
    const isCorrectLogin = await bcrypt.compare(password, user.passwordHash);

    if (isCorrectLogin) {
      const token = jwt.sign(username, SECRET);
      return res.json({ ...user, token });
    }
  }
  return res.sendStatus(401);
});

module.exports = router;
