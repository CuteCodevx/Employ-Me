exports.compantAccount = function (req, res) {
    var username = req.query.username;
    var publication = global.dbHandel.getModel('publication');
    var receivedApply = global.dbHandel.getModel('receivedApplication');
    var invititation = global.dbHandel.getModel('receivedInvite');
    var company = global.dbHandel.getModel('employer');

    company.findOne({username:username},function (err,result3) {
        if(err) throw err;
        publication.find({username:username},function (err,result) {
            if(err) throw err;
            //get compantName
            var companyName = result3.name;
            receivedApply.find({employerAccount:companyName},function (err,result1) {
                if(err) throw err;
                invititation.find({$or:[{employer:companyName},{employer:username}]},function (err,result2) {
                    if(err) throw err;
                    res.render('companyAccount',{public:result,received:result1,invite:result2,nameCompany:result3.name});
                })
            }).sort({'date':-1})
        }).sort({'date':-1})
    })

}
//get detail of company
exports.companydetail=function (req,res) {
    var name = req.query.username;
    var company = global.dbHandel.getModel('employer');
    var comment = global.dbHandel.getModel('comment');
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
            company.findOne({$or:[{username:name},{name:name}]},function (err,result) {
                if(err) throw err;
                res.render('companydetail',{detail:result, comment:result1});
            })
        })
    }).sort({'date':-1})
}

exports.publicJob=function (req,res) {
    var publication = global.dbHandel.getModel('publication');
    publication.create({
        username:req.body.account,
        name:req.body.name,
        career:req.body.career,
        careerType:req.body.type,
        pay:req.body.pay,
        city:req.body.city,
        description:req.body.detail,
        requirement:req.body.requ,
        date:req.body.date,
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