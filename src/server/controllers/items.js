const _ = require('lodash');
const Item = require('../models/item');

exports.getItems = (req, res) => {
  const { path, name } = req.query;
  const { userId } = req;

  let query;
  if (name) {
    const nameQuery = new RegExp(name, 'gi');
    const pathQuery = new RegExp(`^${path}`);
    query = { name: nameQuery, path: pathQuery, owner: userId };
  } else {
    query = { path, owner: userId };
  }

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
    .then((prevItem) => {
      if (
        prevItem.type.find(type => type === 'container')
        && changedValues.path
        && prevItem.path !== changedValues.path
      ) {
        const itemsInsidePath = new RegExp(`^${prevItem.path}/${prevItem._id}`);
        return Item.find({ path: itemsInsidePath }).then((itemsInside) => {
          itemsInside.forEach((item) => {
            const newPath = item.path.replace(item.path, changedValues.path);
            // eslint-disable-next-line no-param-reassign
            item.path = `${newPath}/${prevItem._id}`;
            item.save();
          });
          res.status(200).json({ message: 'Updated item' });
        });
      }
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
    .then((prevItem) => {
      if (prevItem.type.find(type => type === 'trash')) {
        const oldTrash = { ...prevItem._doc };
        const newTrash = new Item(_.omit(oldTrash, ['_id', '__v']));
        newTrash.save();
      }
      if (prevItem.type.find(type => type === 'container')) {
        const itemsInsidePath = new RegExp(`^${prevItem.path}/${prevItem._id}`);
        return Item.deleteMany({ path: itemsInsidePath }).then(() => res.status(200).json({ message: 'Deleted item' }));
      }
      res.status(200).json({ message: 'Deleted item' });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error });
    });
};
