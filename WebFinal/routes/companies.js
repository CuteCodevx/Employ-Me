var express = require('express');
var router = express.Router();
var companyController = require('../controllers/companies');

router.post('/',companyController.companies);

module.exports = router;