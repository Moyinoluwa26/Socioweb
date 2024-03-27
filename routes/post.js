const express = require('express');
const { userPosts, createUserPosts, getFeedPosts, likePost, createComment, getPostComments, deleteComment } = require('../controller/posts');
const router = express.Router();

// GET /posts/user/:userId
router.get('/user/:userId', userPosts);
router.get('/feed', getFeedPosts);
router.post('/upload', createUserPosts);
router.post('/like', likePost);
router.post('/comment', createComment);
router.get('/comment/:postId', getPostComments);
router.delete('/comment/:commentId', deleteComment);

module.exports = router;

