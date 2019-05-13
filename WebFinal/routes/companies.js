var express = require('express');
var router = express.Router();
var companyController = require('../controllers/companies');

router.get('/companyAccount',companyController.compantAccount);
router.post('/companyAccount',companyController.publicJob);
router.get('/companydetail',companyController.companydetail);

module.exports = router;