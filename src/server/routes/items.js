const express = require('express');

const itemsController = require('../controllers/items');

const router = express.Router();

router.post('/', itemsController.postItems);
router.get('/', itemsController.getItems);
router.put('/:id', itemsController.putItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
