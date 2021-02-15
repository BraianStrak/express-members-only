var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require("express-session");
var logger = require('morgan');
var bcrypt = require('bcryptjs');
var LocalStrategy = require ('passport-local').Strategy;
const passport = require("passport");
var User = require('./models/user');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport and session stuff
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/post', postsRouter);

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

var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://test:test@cluster0.jnovg.mongodb.net/express-members-only?retryWrites=true&w=majority"
mongoose.connect(mongoDB,  {useNewUrlParser : true, useUnifiedTopology : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "mongoDB connection error: "));

passport.use( 
  new LocalStrategy((username, password, done) => {
    console.log("entered local strategy method");

    User.findOne({ username }, (error, user) => {
      if (error) {
        console.log("error in finding user");
        return done(error);
      }
      if (!user) {
        console.log("user does not exist");
        return done(null, false, { message: 'User non existent' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          console.log("error in comparing password");
          return done(err);
        }
        if (res) {
          console.log("password correct");
          return done(null, user);
        }
        console.log("password incorrect");
        return done(null, false, { message: 'Incorrect password' });
      });
    });
    
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = app;


