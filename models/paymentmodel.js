const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userAddress: { type: String, required: true },
    animals: [{
        animalId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
