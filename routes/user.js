/* GET users listing. */
exports.list = function(req, res){
    //res.send('respond with a resource');
    
    //initialize db
    //call statement
    var users = [
        {email: 'thomas.langston@example.com', password: 'password'},
        {email:'john.smith@example.org',password: 'ilovejonathoncoulton'}
    ];
    //close db

  res.render('users', { title: 'Users', users: users } );
};
