exports.users = function (req, res) {
    if (!req.session.user||req.session.isCompany==1){
        req.session.error = 'please log in to your personal account first!';
        res.redirect('/login');
    }else{
        var username = req.query.username;
        var request = global.dbHandel.getModel('jobRequest');
        var received = global.dbHandel.getModel('receivedInvite');
        var receivedApplication = global.dbHandel.getModel('receivedApplication');
        //get the application record
        request.find({account:username},function (err,result) {
            if (err) throw err;

            received.find({employee:{$regex:username,$options:"$i"}},function (err,result1) {
                if (err) throw err;

                receivedApplication.find({employeeAccount:username},function (err,result2) {
                    if (err) throw err;
                    res.render('users',{request:result,received:result1,record:result2});
                })

            }).sort({'date':-1})
        }).sort({'date':-1})
    }
}
exports.publicRequest=function (req,res) {
    var request = global.dbHandel.getModel('jobRequest');
    request.create({
        account:req.body.account,
        name:req.body.name,
        job:req.body.job,
        city:req.body.city,
        introduction:req.body.intro,
        date:req.body.date,
        type:req.body.type
    },function (err,result) {
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

exports.userdetails=function (req,res) {
    //username
    var name = req.query.username;
    var namearr=name.split(' ');
    var firstname = namearr[0];
    var lastname = namearr[1];
    var usersTable = global.dbHandel.getModel('employee');
    var comment = global.dbHandel.getModel('comment');
    //calculate the average score

    comment.find({$or:[{username:{$regex:name,$options:"$i"}},{'name':{$regex:name,$options:"$i"}}]},function (err, result) {
        if(err) throw err;
        //calculate
        var aveScore=0;
        //if user has comment
        if(result.length>0){
            for(var i=0;i<result.length;i++){
                aveScore+=result[i].score;
            }
            aveScore = (aveScore/result.length).toFixed(2);
        }
        usersTable.updateOne({$or:[{username:{$regex:name,$options:"$i"}},{$and:[{'firstName':firstname},{'lastName':lastname}]}]}, { $set: { aveScore: aveScore}},function (err,res) {
        if(err) throw err;
        });

        usersTable.findOne({$or:[{username:{$regex:name,$options:"$i"}},{$and:[{'firstName':firstname},{'lastName':lastname}]}]},function (err,result1) {
            if(err) throw err;
            res.render('userdetail',{detail:result1,comment:result});
        })

    }).sort({'date':-1})

}
