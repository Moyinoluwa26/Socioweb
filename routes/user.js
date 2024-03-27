const express = require('express');
const { addFriend, removeFriend, getFriends } = require('../controller/user');
const router = express.Router();

router.post('/:userId/add', addFriend);
router.post('/:userId/remove', removeFriend);
router.get('/friends/:userId', getFriends);

module.exports = router;