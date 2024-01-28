const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const postController = require('../controllers/posts');

// POST request to create a new post
router.post('/posts',
  [auth, [check('title', 'Title is required').not().isEmpty(), check('description', 'Description is required').not().isEmpty()]],
  postController.createPost
);
//DELETE specific post based on object id
router.delete('/posts/:id', auth, postController.deletePost);

//GET specific posts based on username
router.get('/posts/:id', auth, postController.getPosts)

module.exports = router;
