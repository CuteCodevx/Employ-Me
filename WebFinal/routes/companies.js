var express = require('express');
var router = express.Router();
var companyController = require('../controllers/companies');

router.get('/companyAccount',companyController.companyAccount);
router.post('/companyAccount',companyController.publicJob);
router.get('/companydetail',companyController.companydetail);
router.get('/deletePublication',companyController.deleteJob);

module.exports = router;