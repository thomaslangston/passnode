/* GET register page */
exports.register = function(req, res){
    res.render('register', { title: 'Register' });
};

exports.registerPost = function(req, res){
    //if error
    //or if invalid email
    //or if invalid password
        //put error in session
        //redirect to get 
    
    //if email already exists
        //send reset password email
    //else
        //send verify account email 
    
    //redirect to "Check your email" page

    res.render('construction', { title: 'Under Construction' });
}
