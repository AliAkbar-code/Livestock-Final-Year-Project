const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // enum: ['aliakbar200', 'ahmad168', 'umiar196']  // Predefined admin usernames
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
