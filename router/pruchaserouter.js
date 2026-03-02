const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentmodel');
const bodyParser = require('body-parser');

// Middleware to parse URL-encoded form data
router.use(bodyParser.urlencoded({ extended: true }));

// Handle payment form submission
// router.post('/payment/submit', async (req, res) => {
//     try {
//         const { userName, userEmail, userAddress, totalPrice, cart } = req.body;
//         const userId = req.session.userId;

//         if (!userId) {
//             return res.status(401).json({ message: 'User not logged in' });
//         }

//         // Validate that all required fields are provided
//         if (!userName || !userEmail || !userAddress || !totalPrice || !Array.isArray(cart) || cart.length === 0) {
//             return res.status(400).json({ message: 'All fields are required.' });
//         }

//         // Validate that all cart items have required fields
//         for (const item of cart) {
//             if (!item.animalId || !item.name || !item.price || !item.quantity) {
//                 return res.status(400).json({ message: 'Some cart items are missing required fields.' });
//             }
//         }

//         // Create and save the payment document
//         const payment = new Payment({
//             userId: userId,
//             userName: userName,
//             userEmail: userEmail,
//             userAddress: userAddress,
//             animals: cart.map(item => ({
//                 animalId: item.animalId,
//                 name: item.name,
//                 price: item.price,
//                 quantity: item.quantity
//             })),
//             totalPrice: parseFloat(totalPrice) // Ensure totalPrice is a number
//         });

//         await payment.save();
//         res.status(200).json({ message: 'Payment successful!' });
//     } catch (error) {
//         console.error('Payment submission error:', error.message);
//         res.status(500).json({ message: 'Payment failed. Please try again.', error: error.message });
//     }
// });


module.exports = router;
