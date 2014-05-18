var main = require('./main');
var user = require('./user');
var login = require('./login');
var register = require('./register');

module.exports = function(app){
    app.get('/', main.index);
    app.get('/users', user.list);
    
    app.get('/login', login.login);
    app.post('/login', login.loginPost);

    app.get('/register', register.register);
    app.post('/register', register.registerPost);
}
