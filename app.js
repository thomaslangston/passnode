var secrets = require('./secrets');
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var fs = require('fs');
var passport = require('passport');
var passportLocalStrategy = require('passport-local').Strategy;
var pg = require('pg');
//var conString = "postgres://username:password@localhost/database";
//use secrets.conString instead
var sql = require('sql');

passport.use(new passportLocalStrategy(
    function(email, password, done){
        db.user.find({ email: email }, function(err, user){
            if(err) {
                return done(err);
            }
            
            if(!user){
                return done(null, false, { message: 'Incorrect email.' });
            }
            
            if(!user.validPassword(password)){
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }
));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('a not so secret secret'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(flash());

var routes = require('./routes')(app);

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
