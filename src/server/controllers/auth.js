const User = require('../models/user');

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email, password } })
    .then((user) => {
      res.status(200).json({
        message: 'Successful logged in!',
        id: user._id,
        preferences: user.preferences,
        token: 'test',
        expiresIn: 7200
      });
    })
    .catch(() => {
      res.status(404).json({ error: 'Invalid email or password' });
    });
};

exports.postSignin = (req, res) => {
  const { email, password, name } = req.body;
  const user = new User({ email, password, name });

  user
    .save()
    .then((newUser) => {
      res.status(200).json({
        message: 'Successful signed in!',
        id: newUser._id,
        preferences: newUser.preferences,
        token: 'test',
        expiresIn: 7200
      });
    })
    .catch((err) => {
      const errorMsg = err.name === 'ValidationError'
        ? err.message.split(':')[2]
        : err._message;
      res.status(500).json({ error: errorMsg });
    });
};
