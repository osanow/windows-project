const Item = require('../models/item');

exports.postGetItemsByPath = (req, res) => {
  const { path } = req.query;
  Item.find({ path, owner: req.userId })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      console.log(err);
    });
};
