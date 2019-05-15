exports.register = function (req, res) {
    res.render('register',{title:'register'});
}
exports.registerPost = function(req, res) {
    var username = req.body.username;
    var employee = global.dbHandle.getModel('employee');

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
    var employer = global.dbHandle.getModel('employer');

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
    var employee = global.dbHandle.getModel('employee');
    //var company = global.dbHandle.getModel('company');
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
                req.session.user = result.username;
                //0
                req.session.isCompany = 0;
                res.send(result);
            }
        }else{
            var employer = global.dbHandle.getModel('employer');
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
                    //console.log(result);
                    req.session.user = result.username;
                    //1
                    req.session.isCompany = result.isCompany;
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

exports.logout = function (req,res) {
    req.session.user = null;
    req.session.isCompany=null;
    req.session.error = null;
    res.redirect('/');
}

exports.companyHome = function (req, res) {
    //should compare the user is belonged company member or individual
    if (!req.session.user || (req.session.isCompany!= 1)){
        req.session.error = 'please log in to your company account';
        res.redirect('/login');
    }
    res.render('companyHome',{title : 'welcome'+req.session.user});
}


exports.results = function (req, res) {

    var value = req.query.keyword;
    var keyword = req.query.keywordJob;
    var address = req.query.address;
    var publication = global.dbHandle.getModel('publication');
    var jobrequest = global.dbHandle.getModel('jobRequest');
    //find jobs
    if(value){
        publication.find({$or:[{city:{$regex:value,$options:"$i"}},{careerType:{$regex:value,$options:"$i"}}]},function(err,result) {
            if (err) {
                console.log("something wrong..");
            } else {
                res.render('results', {resultOfSearch: result})
            }
        }).sort({'date':-1})
    }else{
        //find cv
        if(address){
            jobrequest.find({$and:[{city:{$regex:address,$options:"$i"}},{$or:[{type:{$regex:keyword,$options:"$i"}},{job:{$regex:keyword,$options:"$i"}}]}]},function (err,result2) {
                if(err) throw err;
                res.render('results',{resultOfSearch:result2})
            }).sort({'date':-1})

        }else{
            jobrequest.find({$or:[{type:{$regex:keyword,$options:"$i"}},{job:{$regex:keyword,$options:"$i"}}]},function (err,result1) {
                if(err) throw err;
                res.render('results',{resultOfSearch:result1})
            }).sort({'date':-1})
        }

    }

}

exports.careerDetail=function(req,res){
    //company name
    var name = req.query.name;
    var career = req.query.career;

    var comment = global.dbHandle.getModel('comment');
    comment.find({$or:[{name:name},{username:name}]},function (err,result) {
        if(err){
            req.session.error= 'something wrong!';
            res.sendStatus(500);
        }else{
            //calculate the average score, and update the database.
            var aveScore = 0;
            //if this company has comment
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    aveScore+=result[i].score;
                }
                aveScore = (aveScore/result.length).toFixed(2);
            }

            //find the detail of this company
            var publication = global.dbHandle.getModel('publication');
            var company = global.dbHandle.getModel('employer');
            publication.findOne({$or:[{name:{$regex:name,$options:"$i"}},{username:name}],career:{$regex:career,$options:"$i"}},function (err,result1) {
                if(err){
                    console.log('wrong.')
                }else{
                    var data = result1._doc;
                    //update the new score
                    company.updateOne({$or:[{name:{$regex:name,$options:"$i"}},{username:name}]}, { $set: { aveScore: aveScore}},function (err,res) {
                        if (err) throw err;
                    })
                    //plus the data from other database
                    company.findOne({$or:[{name:{$regex:name,$options:"$i"}},{username:name}]},function (err,result2) {
                        if(err){
                            console.log("wrong");
                        }else{
                            var address = result2.address +" "+ result2.postcode;
                            var email = result2.email;
                            var score = result2.aveScore;
                            data.address = address;
                            data.email = email;
                            data.score = score;
                            res.render('careerDetail',{comment:result,detail:data});
                        }
                    })
                }
            }).sort({'date':-1})

        }
    }).sort({'date':-1});

}


exports.careerapply = function (req,res) {
    var username = req.body.employeeAccount;
    var career = req.body.career;
    var date = req.body.date;
    var companyUsername = req.body.employerAccount;
    //create application into received application form
    var receivedApply = global.dbHandle.getModel('receivedApplication');
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
    }).sort({'date':-1});

}
//write comment for company. evaluator is job hunter
exports.comment=function (req,res) {
    var comment = global.dbHandle.getModel('comment');
    comment.create({
        username:req.body.username,
        name:req.body.name,
        evaluators:req.body.realName,
        score:req.body.score,
        comments:req.body.content,
        date:req.body.date
    },function (err,doc) {
        if (err){
            req.session.error= 'server is wrong!';
            res.sendStatus(500);
            //console.log(err);
        } else {
            req.session.error = 'create successfully';
            res.sendStatus(200);
        }
    })
}

//get candidate detail from employee table and job request table
exports.candidateDetail=function (req,res) {
    //candidate name
    var name = req.query.name;
    var career = req.query.career;

    var comment = global.dbHandle.getModel('comment');
    var employee = global.dbHandle.getModel('employee');
    var jobrequest = global.dbHandle.getModel('jobRequest');

    jobrequest.findOne({$and:[{$or:[{name:name},{account:name}]},{job:{$regex:career,$options:"$i"}}]},function (err,result) {
        if(err) throw err;
        if(result){
            var data = result;
            //find the comment about this candidate
            comment.find({username:{$regex:data.account,$options:"$i"}},function (err,result2) {
                if(err) throw err;
                //calculate the average score, and update average score
                var aveScore = 0;
                //if this company has comment
                if(result2.length>0){
                    for(var i=0;i<result2.length;i++){
                        aveScore+=result2[i].score;
                    }
                    aveScore = (aveScore/result2.length).toFixed(2);
                }
                employee.updateOne({username:data.account},{$set: { aveScore: aveScore}},function (err, res) {
                    if(err) throw err;
                })

                //find candidate personal detail
                employee.findOne({username:data.account},function (err,result1) {
                    if(err) throw err;
                    res.render('candidatedetail',{detail:result1,job:data.job,city:data.city,intro:data.introduction,comment:result2});
                })
            }).sort({'date':-1})
        }else{
            res.render('error');
        }


    }).sort({'date':-1});
}

exports.candidateInvite=function (req,res) {
    var username = req.body.employee;
    var career = req.body.job;
    var date = req.body.date;
    var companyUsername = req.body.employer;
    //create application into received application form
    var receivedInvite = global.dbHandle.getModel('receivedInvite');
    receivedInvite.findOne({employee:username,job:career,employer:companyUsername}, function (err,result) {
        if (err){
            req.session.error= 'something wrong!';
            res.sendStatus(500);
            //console.log(err);
        }else if(result){
            req.session.error = 'you already applied this job before.';
            res.sendStatus(500);
        }else {
            receivedInvite.create({
                employee:username,
                employer:companyUsername,
                date:date,
                job:career
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
    }).sort({'date':-1})
}