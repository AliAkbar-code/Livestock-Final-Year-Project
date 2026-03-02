// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensures username is unique across all users
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique across all users
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
