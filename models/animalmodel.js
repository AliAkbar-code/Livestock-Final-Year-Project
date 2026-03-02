const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  image: { data: Buffer, contentType: String },
  stock: { type: Number, required: true, default: 1 } // Stock field added
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;