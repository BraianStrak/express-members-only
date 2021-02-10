var async = require('async');
var User = require('../models/user');
var bcrypt = require('bcryptjs');

//test imports to check bug 
var LocalStrategy = require ('passport-local');
const passport = require("passport");

const { body,validationResult } = require("express-validator");

// Display list of all users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: user list');
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: user detail: ' + req.params.id);
};

// Display user create form on GET.
exports.user_create_get = function(req, res, next) {
    res.render('user_form', { title: 'Sign Up!'});
};

// Handle user create on POST.
exports.user_create_post = [

    body('first_name', 'First name required').trim().isLength({ min: 1 }).escape(),
    body('family_name', 'Family name required').trim().isLength({ min: 1 }).escape(),
    body('user_name', 'User name required').trim().isLength({ min: 1 }).escape(),
    body('password', 'Password required').isLength({ min: 8 }), //I don't think passwords should be escaped.

    // Process request after validation and sanitization.
    (req, res, next) => {
        const errors = validationResult(req);

        bcrypt.hash("somePassword", 10, (err, hashedPassword) => {
            // if err, do something
            // otherwise, store hashedPassword+user in DB
            if(err){
                return next(err);
            } else {
                var user = new User (
                    {first_name: req.body.first_name,
                     family_name: req.body.family_name,
                     username: req.body.username,
                     password: hashedPassword,
                     is_member: false,
                    }
                )

                user.save((error) => {
                    if (error) {
                      return next(error);
                    }
                });

                res.redirect('/login');
            }
        });
    }
];

passport.use( //make sure username and password are the same names as in the log in form (I think)
  new LocalStrategy((username, password, done) => {
    
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      };
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      //not sure if this is in the correct place
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })

      return done(null, user);
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

// Display user delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete GET');
};

// Handle user delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete POST');
};

// Display user update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user update GET');
};

// Handle user update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user update POST');
};

exports.user_login_get = function(req, res) {
    res.render('user_login_form');
};

exports.user_login_post = function(req, res) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/user/login"
    })
};
