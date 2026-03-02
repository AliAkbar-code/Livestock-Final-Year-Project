const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  message: { type: String, required: true },
  sender: { type: String, enum: ['user', 'doctor'], required: true },
  timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
