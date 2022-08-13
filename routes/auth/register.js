const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../../models');
const SendEmail = require('../../utilities/emailSender');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password, email } = req.body;
  const sRounds = 10;

  try {
    const passwordHash = await bcrypt.hash(password, sRounds);
    const user = await User.create({ username, email, passwordHash });
    res.json(user);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Invalid input or already in use' });
  }

  await SendEmail(
    {
      content: 'Account created succesfully. Alkemy test',
      subject: 'Alkemy challenge',
      name: username,
    },
    email
  );
});

module.exports = router;
