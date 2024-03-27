const express = require('express');
const { createUserPosts, getuserPosts, getFeedPosts } = require('../controller/post');
const router = express.Router();

router.post('/:userId/upload', createUserPosts);
router.get('/:userId/posts', getuserPosts);
router.get('/feed/:userId', getFeedPosts);




module.exports = router;