const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const tokenConfig = require('../tokenConfig');

const passExpiredIn = 7200; // seconds

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'Invalid email or passwor1d' });

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return res.status(401).send({ error: 'Invalid email or password' });

      const token = jsonwebtoken.sign({ id: user._id }, tokenConfig.secret, {
        expiresIn: passExpiredIn
      });

      return res.status(200).json({
        message: 'Successful logged in!',
        id: user._id,
        preferences: user.preferences,
        token,
        expiresIn: passExpiredIn
      });
    })
    .catch(() => res.status(500).json({ error: 'Server not responded' }));
};

exports.postSignin = (req, res) => {
  const { email, password, name } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = new User({ email, password: hashedPassword, name });

  const token = jsonwebtoken.sign({ id: user._id }, tokenConfig.secret, {
    expiresIn: passExpiredIn
  });

  user
    .save()
    .then((newUser) => {
      res.status(200).json({
        message: 'Successful signed in!',
        id: newUser._id,
        preferences: newUser.preferences,
        token,
        expiresIn: passExpiredIn
      });
    })
    .catch((err) => {
      const errorMsg = err.name === 'ValidationError'
        ? err.message.split(':')[2]
        : err._message;
      res.status(500).json({ error: errorMsg });
    });
};
