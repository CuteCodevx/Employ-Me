exports.companies = function (req, res) {
    var username = req.session.user.username;
    var companies = global.dbHandel.getModel('publication');
    var receivedApply = global.dbHandel.getModel('receivedApplication');
    companies.find({username:username}, function (err, results) {
        if (err) throw err;
        console.log("ssssss"+results);
        //res.locals.data= results;
        var data = results;

        receivedApply.find({employerAccount:username},function (err,result1) {
            if(err) throw err;
            var result = data.concat(result1);
            res.send(result);
        })

    })
}

