const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Item = require('../models/item');
const tokenConfig = require('../tokenConfig');

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'Invalid email or passwor1d' });

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return res.status(401).send({ error: 'Invalid email or password' });

      const token = jsonwebtoken.sign({ id: user._id }, tokenConfig.secret, {
        expiresIn: tokenConfig.passExpiredIn
      });

      return res.status(200).json({
        message: 'Successful logged in!',
        id: user._id,
        preferences: user.preferences,
        token,
        expiresIn: tokenConfig.passExpiredIn
      });
    })
    .catch(() => res.status(500).json({ error: 'Server not responded' }));
};

exports.postSignin = (req, res) => {
  const { email, password, name } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = new User({ email, password: hashedPassword, name });

  const token = jsonwebtoken.sign({ id: user._id }, tokenConfig.secret, {
    expiresIn: tokenConfig.passExpiredIn
  });

  user
    .save()
    .then((newUser) => {
      const items = [{
        name: 'My computer',
        type: ['computer'],
        icon: 'computer.png',
        path: '/Desktop/',
        permanent: true,
        _owner: newUser._id
      }, {
        name: 'Trash',
        type: ['trash', 'container'],
        icon: 'trash-empty.png',
        path: '/Desktop/',
        permanent: true,
        _owner: newUser._id
      }];
      req.newUser = newUser;
      return Item.insertMany(items, { ordered: false });
    })
    .then(() => {
      res.status(200).json({
        message: 'Successful signed in!',
        id: req.newUser._id,
        preferences: req.newUser.preferences,
        token,
        expiresIn: tokenConfig.passExpiredIn
      });
    })
    .catch((err) => {
      const errorMsg = err.name === 'ValidationError'
        ? err.message.split(':')[2]
        : err._message;
      res.status(500).json({ error: errorMsg });
    });
};