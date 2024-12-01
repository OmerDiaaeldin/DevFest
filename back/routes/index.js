var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send("Api is working")
})

router.use('/inventory', (require('./inventory')))
router.use('/truck', require('./truck'))

module.exports = router;
