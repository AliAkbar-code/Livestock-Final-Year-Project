const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userDetails: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    cardDetails: {
        cardName: { type: String },
        cardNumber: { type: String },
        expiryDate: { type: String },
        cvv: { type: String }
    },
    serviceDetails: {
        serviceName: { type: String },
        serviceNumber: { type: String },
        idLast4: { type: String }
    },
    cartItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
