/**
 * This file provides functions to handle users accordingly such as displaying public request and user details
 * @param req
 * @param res
 */
exports.users = function (req, res) {
    if (!req.session.user||req.session.isCompany===1){
        req.session.error = 'please log in to your personal account first!';
        res.redirect('/login');
    }else{
        var username = req.query.username;
        var request = global.dbHandle.getModel('jobRequest');
        var received = global.dbHandle.getModel('receivedInvite');
        var receivedApplication = global.dbHandle.getModel('receivedApplication');
        //get the application record
        request.find({account:username},function (err,result) {
            if (err) throw err;

            received.find({employee:username},function (err,result1) {
                if (err) throw err;

                receivedApplication.find({$and:[{employeeAccount:username},{isDeleted:{$ne:1}}]},function (err,result2) {
                    if (err) throw err;
                    res.render('users',{request:result,received:result1,record:result2});
                }).sort({'date':-1})

            }).sort({'date':-1})
        }).sort({'date':-1})
    }
};
//post cv(job request)
exports.publicRequest=function (req,res) {
    var request = global.dbHandle.getModel('jobRequest');
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
};
//get user detail
exports.userdetails=function (req,res) {
    //username
    var name = req.query.username;
    var namearr = name.split(' ');
    var firstname = namearr[0];
    var lastname = namearr[1];
    var usersTable = global.dbHandle.getModel('employee');
    var comment = global.dbHandle.getModel('comment');
    //calculate the average score

    comment.find({$or:[{username:firstname},{name:name}]},function (err, result) {
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
        usersTable.updateOne({$or:[{username:firstname},{$and:[{'firstName':firstname},{'lastName':lastname}]},{'firstName':firstname}]}, { $set: { aveScore: aveScore}},function (err,res) {
        if(err) throw err;
        });

        usersTable.findOne({$or:[{username:firstname},{$and:[{'firstName':firstname},{'lastName':lastname}]},{'firstName':firstname}]},function (err,result1) {
            if(err) throw err;
            res.render('userdetail',{detail:result1,comment:result});
        })

    }).sort({'date':-1})
};
