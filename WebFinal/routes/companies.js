var express = require('express');
var router = express.Router();
var companyController = require('../controllers/companies');

router.get('/companyAccount',companyController.companyAccount);
router.post('/companyAccount',companyController.publicJob);
router.get('/companydetail',companyController.companydetail);
router.post('/deletePublication',companyController.deleteJob);

router.post('/getGeocode',companyController.getGeocode);

module.exports = router;