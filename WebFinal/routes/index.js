var express = require('express');
var router = express.Router();
var loginAndRegisterController = require('../controllers/loginAndRegisterController/loginAndRegister');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });

});

router.get('/register',loginAndRegisterController.register);
router.post('/register',loginAndRegisterController.registerPost);

router.get('/registercompany',loginAndRegisterController.registerCompany);
router.post('/registercompany',loginAndRegisterController.registerCompanyPost);

router.get('/login',loginAndRegisterController.login);
router.post('/login',loginAndRegisterController.loginPost);

router.get('/home',loginAndRegisterController.home);
router.post('/home',loginAndRegisterController.getResults);

router.get('/logout', loginAndRegisterController.logout);

router.get('/companyAccount',loginAndRegisterController.companyAccount);

router.get('/results',loginAndRegisterController.results);
router.post('/results',loginAndRegisterController.getCareerDetail);

router.get('/careerdetail',loginAndRegisterController.careerDetail);
router.post('/careerdetail',loginAndRegisterController.careerapply);



module.exports = router;
