var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  next();
}, function (req, res) {
  res.send('respond with a resource');
}
);

router.get('/id', function (req, res, next) {
  res.send('id of the user is');
});

module.exports = router;
