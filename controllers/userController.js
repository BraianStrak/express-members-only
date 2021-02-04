var async = require('async');
var User = require('../models/user');

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

    // Process request after validation and sanitization.
    (req, res, next) => {

        const errors = validationResult(req);
    
        var user = new User (
            {first_name: req.first_name,
             family_name: req.family_name,
             user_name: req.user_name}
        )

        

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