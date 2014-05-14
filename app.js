var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var passport = require('passport');
var passportLocalStrat = require('passport-local').Strategy;

var dbFile = "test.db"
var exists = fs.existsSync(dbFile);

if(!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
}

var db = new sqlite3.Database(dbFile);

db.serialize(function(){
    if(!exists){
        db.run("CREATE TABLE User (email TEXT, password TEXT)");
    }
});

//var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");
  
////Insert random data
//var rnd;
//    for (var i = 0; i < 10; i++) {
//        rnd = Math.floor(Math.random() * 10000000);
//        stmt.run("Thing #" + rnd);
//    }
//                      
//    stmt.finalize();
//});

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
