const Item = require('../models/item');

exports.getItems = (req, res) => {
  const { path } = req.query;

  const query = { path, owner: req.userId };
  if (!path) delete query.path;

  Item.find(query)
    .then((items) => {
      const newItems = items.map(item => ({
        ...item._doc,
        size: Buffer.byteLength(item.content, 'utf8')
      }));
      res.status(200).json(newItems);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error });
    });
};

exports.postItems = (req, res) => {
  const { items } = req.body;

  const updatedItems = items.map((item) => {
    const updatedItem = {
      ...item,
      owner: req.userId
    };
    return updatedItem;
  });

  Item.insertMany(updatedItems)
    .then(() => {
      res.status(200).json({ message: 'Added new items' });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error });
    });
};

exports.putItem = (req, res) => {
  const { changedValues } = req.body;
  const { id } = req.params;

  Item.findByIdAndUpdate(id, { $set: { ...changedValues } })
    .then(() => {
      res.status(200).json({ message: 'Updated item' });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error });
    });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;

  Item.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Deleted item' });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error });
    });
};
