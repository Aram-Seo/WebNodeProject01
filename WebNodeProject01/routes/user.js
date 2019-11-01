var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('User Page\n');
});

router.get('/user', function (req, res, next) {
    res.render('users/user');
});

module.exports = router;
