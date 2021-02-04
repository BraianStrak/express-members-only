var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/postController');


// GET catalog home page. THIS CORRESPONDS TO website.com/post because that is the url to get to this router
router.get('/', post_controller.index);

// GET request for creating a post. NOTE This must come before routes that display post (uses id).
router.get('/create', post_controller.post_create_get);

// POST request for creating post.
router.post('/create', post_controller.post_create_post);

// GET request to delete post.
router.get('/:id/delete', post_controller.post_delete_get);

// POST request to delete post.
router.post('/:id/delete', post_controller.post_delete_post);

// GET request to update post.
router.get('/:id/update', post_controller.post_update_get);

// POST request to update post.
router.post('/:id/update', post_controller.post_update_post);

// GET request for one post.
router.get('/:id', post_controller.post_detail);

// GET request for list of all post items.
router.get('/all', post_controller.post_list);


module.exports = router;
