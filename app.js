var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var pathList = {};
// var imager = require('./google_scrape');
//console.log(imager)
var bodyParser = require('body-parser');
var port = 3343;
var index = require('./routes/index');
var wdnt = require('./routes/wdnt');
var users = require('./routes/users');
var app = express();
//https://github.com/morungos/wordnet
var WordSearcher = require("./WordSearcher")
var wn = new WordSearcher();
wn.tangent("duke",10);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/wn',wdnt);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port,function(){
	console.log("we're going at",port);
});


module.exports = app;
