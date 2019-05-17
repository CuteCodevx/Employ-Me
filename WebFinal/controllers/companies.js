const geocode = require('../util/geocode');
exports.companyAccount = function (req, res) {
    var username = req.query.username;
    var publication = global.dbHandle.getModel('publication');
    var receivedApply = global.dbHandle.getModel('receivedApplication');
    var invitation = global.dbHandle.getModel('receivedInvite');
    var company = global.dbHandle.getModel('employer');


    company.findOne({username:username},function (err,result3) {
        if(err) throw err;
        publication.find({$and:[{username:username},{isDeleted:{$ne:1}}]},function (err,result) {
            if(err) throw err;
            //get company Name
            var companyName = result3.name;
            receivedApply.find({$and:[{employerAccount:companyName},{isDeleted:{$ne:1}}]},function (err,result1) {
                if(err) throw err;
                invitation.find({$or:[{employer:companyName},{employer:username}]},function (err,result2) {
                    if(err) throw err;

                    res.render('companyAccount',{public:result,received:result1,invite:result2,nameCompany:result3.name});


                }).sort({'date':-1})
            }).sort({'date':-1})
        }).sort({'date':-1})
    })
};

//get detail of company
exports.companydetail=function (req,res) {
    var name = req.query.username;
    var company = global.dbHandle.getModel('employer');
    var comment = global.dbHandle.getModel('comment');
    comment.find({$or:[{username:name},{name:name}]},function (err, result1) {
        if(err) throw err;
        //calculate
        var aveScore=0;
        //if user has comment
        if(result1.length>0){
            for(var i=0;i<result1.length;i++){
                aveScore+=result1[i].score;
            }
            aveScore = (aveScore/result1.length).toFixed(2);
        }
        company.updateOne({$or:[{username:name},{name:name}]}, { $set: { aveScore: aveScore}},function (err,status) {
            if (err) throw err;
        })

        company.findOne({$or:[{username:name},{name:name}]},function (err,result) {
            if(err) throw err;
            res.render('companydetail',{detail:result, comment:result1});
        })

    }).sort({'date':-1})
};

exports.publicJob=function (req,res) {
    imageUploader(req,res,function (err) {
        if(err){
            console.log(err);
            return ;
        }
        var publication = global.dbHandle.getModel('publication');
        //find the job first, if the company post the job before, they cannot to put again
        publication.findOne({$and:[{username:req.body.account},{career:req.body.career}]},function (err,result) {
            if(err){
                req.session.error= 'server is wrong!';
                res.sendStatus(500);
            }else if(result){
                req.session.error= 'server is wrong!';
                res.sendStatus(500);
            }else{
                publication.create({
                    username:req.body.account,
                    name:req.body.name,
                    career:req.body.career,
                    careerType:req.body.type,
                    pay:req.body.pay,
                    city:req.body.city,
                    address:req.body.streetAddress,
                    state:req.body.state,
                    postcode:req.body.postcode,
                    country:req.body.country,
                    description:req.body.description,
                    requirement:req.body.requ,
                    date:req.body.date,
                    path:req.file.filename
                },function (err,result) {
                    if(err){
                        req.session.error= 'server is wrong!';
                        res.sendStatus(500);
                    }else{
                        req.session.error= 'create successfully!';
                        res.sendStatus(200);
                    }
                })
            }
        })

    })

};
exports.deleteJob=function (req,res) {
    var username=req.body.username;
    var name=req.body.name;
    var career=req.body.career;
    var publication = global.dbHandle.getModel('publication');
    var receivedApply = global.dbHandle.getModel('receivedApplication');
    publication.updateOne({$and:[{username:username},{career:career}]},{$set:{isDeleted:1}},function (err,raw) {
        if (err){
            res.sendStatus(500);
        }else{
            receivedApply.updateOne({$and:[{employerAccount:name},{career:career}]},{$set:{isDeleted:1}},function (err,raw) {
                if (err){
                    res.sendStatus(500);
                }else{
                    res.sendStatus(200);
                }
            })
        }
    })
}

exports.getGeocode=function (req,res) {
    geocode(req.body.postcode, (error, { latitude, longitude }) => {
        if (error) {
            console.log(error)
        }
        if(latitude==null && longitude==null){
            res.sendStatus(500);
        }else{
            let result={latitude:latitude, longitude:longitude};
            res.send(result);
        }

    })
}