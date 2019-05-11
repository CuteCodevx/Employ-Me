exports.register = function (req, res) {
    res.render('register',{title:'register'});
}
exports.registerPost = function(req, res) {
    var username = req.body.username;
    var employee = global.dbHandel.getModel('employee');

    employee.findOne({username:username}, function (err,result) {
        if (err){
            req.session.error= 'something wrong!';
            res.sendStatus(500);
            //console.log(err);
        }else if(result){
            req.session.error = 'cannot create the user because the username already exists.';
            res.sendStatus(500);
        }else {
            employee.create({
                username:username,
                password:req.body.password,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                phoneNumber:req.body.tel,
                degreeLevel:req.body.degreeLevel,
                major:req.body.major,
                aveScore:0.0
            },function (err, doc) {
                if (err){
                    req.session.error= 'server is wrong!';
                    res.sendStatus(500);
                    //console.log(err);
                } else {
                    req.session.error = 'create successfully';
                    res.sendStatus(200);
                }
            });
        }
    })
}
exports.registerCompany = function(req, res){
    res.render('registercompany');
}
exports.registerCompanyPost=function(req, res){
    var username = req.body.username;
    var employer = global.dbHandel.getModel('employer');

    employer.findOne({username:username}, function (err,result) {
        if (err){
            req.session.error= 'something wrong!';
            res.sendStatus(500);
            //console.log(err);
        }else if(result){
            req.session.error = 'cannot create the user because the username already exists.';
            res.sendStatus(500);
        }else {
            employer.create({
                username:username,
                password:req.body.password,
                name:req.body.companyName,
                city:req.body.city,
                address:req.body.address,
                postcode:req.body.postcode,
                email:req.body.email,
                aveScore:0.0,
                isCompany:1
            },function (err, doc) {
                if (err){
                    req.session.error= 'server is wrong!';
                    res.sendStatus(500);
                } else {
                    console.log(doc)
                    req.session.error = 'create successfully';
                    res.sendStatus(200);
                }
            });
        }
    })
}
exports.login = function (req, res) {
    res.render('login', { title: 'Login'});
}
exports.loginPost = function (req, res){
    var username = req.body.username;
    var psw = req.body.password;
    var employee = global.dbHandel.getModel('employee');
    //var company = global.dbHandel.getModel('company');
    employee.findOne({username:username},function (err,result) {
        if(result!=null){
            if (err){
                req.session.error= 'something wrong!';
                res.sendStatus(500);
                //console.log(err);
            } else if (!result){
                req.session.error = 'We cannot find an account with that username';
                res.sendStatus(404);

            } else if(psw!=result.password){
                req.session.error = 'password is incorrect';
                res.sendStatus(404);
            }else{
                req.session.user = result;
                res.send(result);
            }
        }else{
            var employer = global.dbHandel.getModel('employer');
            employer.findOne({username:username},function (err,result) {
                if (err){
                    req.session.error= 'something wrong!';
                    res.sendStatus(500);
                    //console.log(err);
                } else if (!result){
                    req.session.error = 'We cannot find an account with that username';
                    res.sendStatus(404);

                } else if(psw!=result.password){
                    req.session.error = 'password is incorrect';
                    res.sendStatus(404);
                }else{
                    req.session.user = result;
                    res.send(result);
                }

            });
        }


    });

}

exports.home = function (req,res) {
    //console.log(req);
    res.render('home',{title : 'welcome'+req.session.user});
}

exports.getResults=function(req,res){
    var value = req.body.value;
    var publication = global.dbHandel.getModel('publication');
    publication.find({city:{$regex:value,$options:"$i"}},function(err,result){
        if(result.length>0){
            if(err){
                console.log("something wrong..");
            }else{
                res.send(result);
            }
        }else{
            publication.find({careerType:{$regex:value,$options:"$i"}},function(err,result){
                if(err){
                    console.log("something wrong..");
                }else{
                    res.send(result);
                }
            })
        }


    })
}

exports.logout = function (req,res) {
    req.session.user = null;
    req.session.error = null;
    res.redirect('/');
}

exports.companyAccount = function (req, res) {
    //should compare the user is belonged company member or individual
    if (!req.session.user){
        req.session.error = 'please log in to your company account';
        res.redirect('/login');
    }
    res.render('companyAccount',{title : 'welcome'+req.session.user});
}


exports.results = function (req, res) {
    res.render('results', { title: 'results'});
}

exports.getCareerDetail=function (req,res) {
    var name = req.body.name;
    var career = req.body.career;
    var publication = global.dbHandel.getModel('publication');
    var company = global.dbHandel.getModel('employer');
    publication.findOne({name:{$regex:name,$options:"$i"},career:{$regex:career,$options:"$i"}},function (err,result) {
        if(err){
            console.log('wrong.')
        }else{
            var data = result._doc;
            //plus the data from other database
            company.findOne({name:{$regex:name,$options:"$i"}},function (err,result2) {
                if(err){
                    console.log("wrong");
                }else{
                    var address = result2.address +" "+ result2.postcode;
                    var email = result2.email;

                    data.address = address;
                    data.email = email;
                    res.send(data);
                }
            })
        }
    })
}
exports.careerDetail=function(req,res){
    res.render('careerDetail');
}


exports.careerapply = function (req,res) {
    var username = req.body.employeeAccount;
    var career = req.body.career;
    var date = req.body.date;
    var companyUsername = req.body.employerAccount;
    //create application into received application form
    var receivedApply = global.dbHandel.getModel('receivedApplication');
    receivedApply.findOne({employeeAccount:username,career:career,employerAccount:companyUsername}, function (err,result) {
        if (err){
            req.session.error= 'something wrong!';
            res.sendStatus(500);
            //console.log(err);
        }else if(result){
            req.session.error = 'you already applied this job before.';
            res.sendStatus(500);
        }else {
            receivedApply.create({
                employeeAccount:username,
                employerAccount:companyUsername,
                date:date,
                career:career
            },function (err, doc) {
                if (err){
                    req.session.error= 'server is wrong!';
                    res.sendStatus(500);
                    //console.log(err);
                } else {
                    req.session.error = 'create successfully';
                    res.sendStatus(200);
                }
            });
        }
    })

}