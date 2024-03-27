const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 100
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post'
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
},
    { timestamps: true }
);


const User = mongoose.model('User', userSchema);

module.exports = User;
