var express = require('express');
const { getAllInventories, addInventories } = require('../controllers/inventory');
var router = express.Router();

router.route('/')
.get(getAllInventories)
.post(addInventories);

module.exports = router;
