exports.users = function (req, res) {
    if (!req.session.user){
        req.session.error = 'please log in to your personal account first!';
        res.redirect('/login');
    }else{
        var username = req.query.username;
        var request = global.dbHandel.getModel('jobRequest');
        request.find({account:username},function (err,result) {
            if (err) throw err;
            var received = global.dbHandel.getModel('receivedInvite');
            received.find({employee:username},function (err,result1) {
                if (err) throw err;
                res.render('users',{request:result,received:result1});
            })
        })
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
