var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var mongoose = require('mongoose');
global.dbHandle = require('./database/mongo');
global.db = mongoose.connect("mongodb+srv://admin:team4123456@cluster0-mozuc.mongodb.net/mongodbWeb?retryWrites=true");
//global.db = mongoose.connect("mongodb://localhost:27017/mongodbWeb");


//Declares this as an Express App
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//ejs not 'pug'
//app.set('view engine', 'ejs');
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

//Adds middleware libraries using app.use()
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//define a directory named 'public' at the same level as where you call node to serve static pages easier
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:true}));
//app.use(multer());

app.use(session({
  secret:'secret',
  cookie:{
    maxAge: 1000*60*30
  },
  resave:true,
  saveUninitialized:false
}));

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.isCompany=req.session.isCompany;
  var error = req.session.error;
  delete req.session.error;
  res.locals.msg = "";
  if (error){
    res.locals.msg = error;
  }
  next();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companiesRouter = require('./routes/companies');

//apply the routes to our application
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company',companiesRouter);
// app.use('/register', indexRouter);
// app.use('/home',indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
