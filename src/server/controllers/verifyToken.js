const jsonwebtoken = require('jsonwebtoken');

const tokenConfig = require('../tokenConfig');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(403).send({ error: 'No token provided.' });

  return jsonwebtoken.verify(token, tokenConfig.secret, (err, decoded) => {
    if (err) res.status(500).send({ error: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
