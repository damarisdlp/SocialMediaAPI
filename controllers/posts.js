const { validationResult } = require('express-validator');
const Post = require('../models/posts');
const User = require('../models/users');

// Controller function to create a new post
const createPost = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: 'Invalid inputs' });
  }

  try {
    // Create a new post
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      author: req.user.id
    });

    // Save the post to the database
    await post.save();

    // Return the new post object
    res.json({
      id: post.id,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deletePost = async (req, res) => {
  try {
    // Find the post by ID and verify it was created by the authenticated user
    const post = await Post.findOne({ _id: req.params.id, author: req.user.id });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

     // Find the user by ID and remove the post from the user's posts array
     const user = await User.findByIdAndUpdate(req.user.id, { $pull: { posts: req.params.id } });
     
    // Delete the post and its associated comments
    await Post.deleteOne({ _id: req.params.id });

    res.status(204).json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { createPost , deletePost};
