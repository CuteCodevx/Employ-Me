var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController/users');

/* GET users listing. */
router.get('/', usersController.users);


module.exports = router;
