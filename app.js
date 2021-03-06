'use strict';
const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const util = require('util');
const url = require('url');
const routes = require('./routes/index');
const detail = require('./routes/detail');
const message = require('./routes/message');
const login = require('./routes/myblog/login');
const myIndex = require('./routes/myblog/index');
const myDetail = require('./routes/myblog/detail');
const myMessage = require('./routes/myblog/message');
const db = require('./service/db');
const app = express();

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
app.get(/myblog/, (req, res, next) => {
    let cookie = req.cookies;
    let loginUrl = '/myblog/login';
    let isLogin = req.url === loginUrl;
    let isNext = function(){
        isLogin ? next() : res.redirect(loginUrl);
    };
    if(util.isObject(cookie) && cookie.pass && cookie.time){
        let sql = "select * from login where password = '" + cookie.pass + "' and time = '" + cookie.time + "'";
        db(sql, function(err, rows, fields){
            if(!err && rows.length){
                isLogin ? res.redirect('/myblog/index') : next();
            }else{
                isNext();
            }
        });
    }else{
        isNext();
    }
});

app.use('/', routes);
app.use('/index', routes);
app.use('/detail', detail);
app.use('/message', message);
app.use('/myblog', myIndex);
app.use('/myblog', login);
app.use('/myblog', myDetail);
app.use('/myblog', myMessage);

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
   /* var err = new Error('Not Found');
    err.status = 404;
    next(err);*/
    res.redirect('/index')
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
