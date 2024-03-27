const post = require('../models/posts.js');
const comment = require('../models/comments.js');

const userPosts = async (req, res) => {
    try {
        const posts = await post.find({ user: req.params.userId }).populate('user', 'name');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createUserPosts = async (req, res) => {
    try {
        const { userId, title, content } = req.body;

        // Create a new post
        const newPost = new post({
            user: userId,
            title,
            content
        });

        // Save the new post
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFeedPosts = async (req, res) => {
    try {
        // Get the user's followers
        const user = await user.findById(req.params.userId);
        const friends = user.friends;

        // Find posts created by the user's followers
        const feedPosts = await post.find({ user: { $in: friends } }).populate('user', 'name');

        res.status(200).json(feedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;

        // Find the post
        const post = await post.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: "You have already liked this post" });
        }

        // Add the user's ID to the post's likes array
        post.likes.push(userId);

        // Save the updated post
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body;

        // Create a new comment
        const newComment = new comment({
            user: userId,
            post: postId,
            content
        });

        // Save the new comment
        const savedComment = await newComment.save();

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostComments = async (req, res) => {
    try {
        const comments = await comment.find({ post: req.params.postId }).populate('user', 'name');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        // Find the comment
        const comment = await comment.findById(commentId);

        // Check if the comment exists
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Delete the comment
        await comment.deleteOne({ _id: commentId });

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    userPosts,
    createUserPosts,
    getFeedPosts,
    likePost,
    createComment,
    getPostComments,
    deleteComment
};