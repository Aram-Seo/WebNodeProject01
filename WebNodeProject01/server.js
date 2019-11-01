"use strict";

var Server = function () {
    const express           = require('express');
    const path              = require('path');
    const logger            = require('morgan');
    const cookieParser      = require('cookie-parser');
    const bodyParser        = require('body-parser');
    const http              = require('http');
    const session           = require('express-session');
    const app               = express();
    const fs                = require('fs');


    global.LogManager       = require('./public/LogManager');

    let test                = require('./routes/test');
    let index               = require('./routes/index');
    let user                = require('./routes/user');

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //-------------front에서 css 및 javascript 사용을 위한 적용
    app.use(express.static(__dirname + '/'));

    // uncomment after placing your favicon in /public
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(session({ // cookie 사용을 위한 값
        secret: 'abcdefghijklmnopqrstuvwxyz',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))

    //app.use('/users', users);
    app.use('/', index);
    app.use('/test', test.parse);
    app.use('/user', user);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    //var port = normalizePort(process.env.PORT || '16635');
    app.set('port', 16635);

    http.createServer(app).listen(app.get('port'), '::', function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
};

if (true) Server();