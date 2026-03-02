const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true }, // Years of experience
  qualifications: { type: String, required: true }, // Qualifications details
  image: { data: Buffer, contentType: String }, // Store image as a buffer
  address: { type: String }, // Office or clinic address
  location: { type: String }, // New location field
  availableHours: { type: String }, // Available hours for consultation
  consultationFee: { type: Number }, // Fee per consultation
  ratings: { type: Number, default: 0 }, // Rating score for the doctor
  createdAt: { type: Date, default: Date.now } // Record creation timestamp
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;