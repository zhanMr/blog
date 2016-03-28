var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var detail = require('./routes/detail');
var message = require('./routes/message');
var login = require('./routes/login');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
/*app.set('view engine', 'jade');*/

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());





app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

//托管静态文件，例如图片、css、javascript
app.use(express.static(path.join(__dirname, 'public')));

//验证登录中间件
/*app.get(/(index|detail)/, function(req, res, next){
    if(req.cookies && req.cookies.name){
        next();
    }else{
        res.redirect('/login')
    }
});*/
app.use('/', routes);
app.use('/index', routes);
app.use('/users', users);
app.use('/detail', detail);
app.use('/message', message);
app.use('/login', login);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
