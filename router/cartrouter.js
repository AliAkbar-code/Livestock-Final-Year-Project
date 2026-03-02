const express = require('express');
const router = express.Router();
const Cart = require('../models/cartmodel');

// Handle payment submission
// router.post('/submit', async (req, res) => {
//     const { userName, userEmail, userAddress, cart, totalPrice } = req.body;

//     // Create a new cart entry
//     const newCart = new Cart({
//         userName,
//         userEmail,
//         userAddress,
//         cart,
//         totalPrice
//     });

//     try {
//         await newCart.save();
//         res.json({ message: 'Payment successful!' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Payment failed. Please try again.' });
//     }
// });

module.exports = router;
