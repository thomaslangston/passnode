/* GET login page */
exports.login = function(req, res){
    res.render('login', { title: 'Login' });
};

exports.loginPost = function(req, res){
    //if error
    //or if email not found
    //or if password not found
        //put error in session
        //redirect to get
    //authenticate
    //redirect to main page

    res.render('construction', { title: 'Under Construction' });
}
