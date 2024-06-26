const post = require('../models/posts');
const User = require('../models/user');
//const comment = require('../models/comments');

const createUserPosts = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Create a new post
        const newPost = new post({
            user: req.params.userId,
            title,
            content
        });

        // Save the new post
        const savedPost = await newPost.save();

        // Add postId to the user's post field array
        const user = await User.findById(req.params.userId);
        user.posts.push(savedPost._id);
        await user.save();

        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getuserPosts = async (req, res) => {
    try {
        const posts = await post.find({ user: req.params.userId }).populate('user', 'name');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getFeedPosts = async (req, res) => {
    try {
        // Get the user's followers
        const user = await User.findById(req.params.userId);
        const friends = user.friends;

        // Find posts created by the user's followers
        const feedPosts = await post.find({
            $or: [
                { user: { $in: friends } }, // Posts by friends
                { user: req.params.userId } // Posts by the user themselves
            ]
        }).populate('user', 'name');

        res.status(200).json(feedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





module.exports = { createUserPosts, getuserPosts, getFeedPosts };