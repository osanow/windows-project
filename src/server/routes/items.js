const express = require('express');

const itemsController = require('../controllers/items');

const router = express.Router();

// router.get('', itemsController.getItems);
router.post('/', itemsController.postGetItemsByPath);

module.exports = router;
