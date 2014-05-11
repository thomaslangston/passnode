var main = require('./main');
var user = require('./user');
var login = require('./login');

module.exports = function(app){
    app.get('/', main.index);
    app.get('/users', user.list);
    app.get('/login', login.login);
    app.post('/login', login.loginPost);
}
