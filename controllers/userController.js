var async = require('async');
var User = require('../models/user');
var bcrypt = require('bcryptjs');

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
                     user_name: req.body.user_name,
                     password: hashedPassword,
                     is_member: false,
                    }
                )

                user.save((error) => {
                    if (error) {
                      return next(error);
                    }
                });

                res.redirect('/user/login');
            }
        });
    }
];

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
    res.render('user_login_form', { title: 'Log In!'});
};

exports.user_login_post = function(req, res) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/user/login"
    })
};
