const User = require("../models/user");

const addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;

        // Find the user by userId
        const user = await User.findById(req.params.userId);

        // Add friendId to the user's friend array
        user.friends.push(friendId);

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add friend", error: error.message });
    }
};

const removeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;

        // Find the user by userId
        const user = await User.findById(req.params.userId);

        // Remove friendId from the user's friend array

        user.friends = user.friends.filter((friend) => friend.toString() !== friendId);

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove friend", error: error.message });
    }
};
const getFriends = async (req, res) => {
    try {


        // Find the user by userId
        const user = await User.findById(req.params.userId);

        // Get the user's friends
        const friends = await User.find({ _id: { $in: user.friends } }, { firstName: 1, lastName: 1 });

        res.status(200).json({ friends });
    } catch (error) {
        res.status(500).json({ message: "Failed to get friends", error: error.message });
    }
};

module.exports = { addFriend, removeFriend, getFriends };