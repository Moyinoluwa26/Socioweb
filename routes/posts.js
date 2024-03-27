const express = require('express');
const { createUserPosts, getuserPosts } = require('../controller/post');
const router = express.Router();

router.post('/:userId/upload', createUserPosts);
router.get('/:userId/posts', getuserPosts);



module.exports = router;