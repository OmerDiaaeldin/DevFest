var express = require('express');
const { getAllTrucks, addTrucks } = require('../controllers/truck');
var router = express.Router();

router.route('/')
.get(getAllTrucks)
.post(addTrucks);

module.exports = router;
