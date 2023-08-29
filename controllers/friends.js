const User = require('../models/users');

// Controller function to send a friend request
const sendFriendRequest = async (req, res) => {
  try {
    const userName = req.params.username;

    // Find the user to whom the friend request is being sent
    const friendUser = await User.findOne({ username: userName });

    if (!friendUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the friend request to the recipient user's pendingRequests array
    friendUser.pendingRequests.push(req.user.id);
    await friendUser.save();

    res.json({ message: 'Friend request sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Controller function to accept a friend request
const acceptFriendRequest = async (req, res) => {
  try {
    const requestIdt  = req.params.requestId;

    // Find the current user and update their friends and pendingRequests arrays
    const currentUser = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { friends: requestIdt }, $pull: { pendingRequests: requestIdt } },
      { new: true }
    );

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the user who sent the friend request and update their friends array
    const friendUser = await User.findByIdAndUpdate(
        requestIdt,
      { $push: { friends: req.user.id } },
      { new: true }
    );

    if (!friendUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Friend request accepted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { sendFriendRequest, acceptFriendRequest };
