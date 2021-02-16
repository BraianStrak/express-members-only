var async = require('async');
var Post = require('../models/post');

const { body,validationResult } = require("express-validator");

//Display home page of all posts
exports.index = function(req, res) {
    res.render("index", { user: req.user });
};

// Display list of all posts.
exports.post_list = function(req, res) {
    res.send('NOT IMPLEMENTED: post list');
};

// Display detail page for a specific post.
exports.post_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: post detail: ' + req.params.id);
};

// Display post create form on GET.
exports.post_create_get = function(req, res) {
    res.render('post_form', { user: req.user });
};

// Handle post create on POST.
exports.post_create_post = [
    body('title', 'Title required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description required').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        console.log("inside post create post function");
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Post object with escaped and trimmed data, and current user as author
        var post = new Post(
        { 
            title: req.body.title,
            description: req.body.description,
            user: req.user,
        })

        //if there are errors
        if (!errors.isEmpty()) {
            console.log("encountered an error creating a post");
            res.redirect('/post/create');

        //if there are no errors
        } else {
            console.log("saving post");
            post.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to index
                res.redirect('/');
            });
        }    
    }
];

// Display post delete form on GET.
exports.post_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: post delete GET');
};

// Handle post delete on POST.
exports.post_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post delete POST');
};

// Display post update form on GET.
exports.post_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: post update GET');
};

// Handle post update on POST.
exports.post_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post update POST');
};


