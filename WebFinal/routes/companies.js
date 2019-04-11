var express = require('express');
var router = express.Router();
var companyController = require('../controllers/companyController/companies');

router.post('/',companyController.companies);

module.exports = router;