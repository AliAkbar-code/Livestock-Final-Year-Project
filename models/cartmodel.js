const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userAddress: String,
    cart: [
        {
            animalId: String,
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalPrice: Number
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
