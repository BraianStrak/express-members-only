var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');


// GET request for creating a user. NOTE This must come before routes that display user (uses id).
router.get('/create', user_controller.user_create_get);

// POST request for creating user.
router.post('/create', user_controller.user_create_post);

// GET request to delete user.
router.get(':id/delete', user_controller.user_delete_get);

// POST request to delete user.
router.post(':id/delete', user_controller.user_delete_post);

// GET request to update user.
router.get(':id/update', user_controller.user_update_get);

// POST request to update user.
router.post(':id/update', user_controller.user_update_post);

// GET request for one user.
router.get(':id', user_controller.user_detail);

// GET request for list of all user items.
router.get('/all', user_controller.user_list);

// GET request for user login
router.get('/login', user_controller.user_login_get);

// POST request for user login
router.post('/login', user_controller.user_login_post);

// GET request for user log out
router.get('/logout', user_controller.user_logout_get);




module.exports = router;
