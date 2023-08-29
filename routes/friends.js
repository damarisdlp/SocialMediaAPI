const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const friendController = require('../controllers/friends');

// POST request to send a friend request
router.post('/friends/:username', auth, friendController.sendFriendRequest);

// POST request to accept a friend request
router.post('/friends/accept/:requestId', auth, friendController.acceptFriendRequest);

module.exports = router;
