exports.users = function (req, res) {
    if (!req.session.user){
        req.session.error = 'please log in to your personal account first!';
        res.redirect('/login');
    }
    res.render('users');
}
