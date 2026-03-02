const express = require('express');
const router = express.Router();
const Order = require('../models/ordermodel');  // Assuming you named your model file Order.js
const Animal = require('../models/animalmodel');



router.post('/checkout', async (req, res) => {
    try {
        const { cart, totalPrice, userDetails } = req.body;
  
        // Create order data with the specified payment method details
        const orderData = {
            userDetails: {
                name: userDetails.name,
                address: userDetails.address,
                phone: userDetails.phone
            },
            paymentMethod: userDetails.paymentMethod,
            cartItems: cart,
            totalPrice: parseFloat(totalPrice),
            status: 'Pending',
            createdAt: new Date()
        };
  
        // Add specific payment details based on the payment method
        if (userDetails.paymentMethod === 'creditCard') {
            orderData.cardDetails = {
                cardName: userDetails.cardDetails.cardName,
                cardNumber: userDetails.cardDetails.cardNumber,
                expiryDate: userDetails.cardDetails.expiryDate,
                cvv: userDetails.cardDetails.cvv
            };
        } else if (userDetails.paymentMethod === 'jazzCash' || userDetails.paymentMethod === 'easyPaisa') {
            orderData.serviceDetails = {
                serviceName: userDetails.serviceDetails.serviceName,
                serviceNumber: userDetails.serviceDetails.serviceNumber,
                idLast4: userDetails.serviceDetails.idLast4
            };
        }
  
        // Save the order to the database
        const newOrder = new Order(orderData);
        await newOrder.save();
  
        // Update stock for each item in the cart
        for (const item of cart) {
            const animal = await Animal.findById(item._id);  // _id should match the correct field name
            if (animal) {
                animal.stock -= item.quantity;
                if (animal.stock < 0) {
                    animal.stock = 0;
                }
                await animal.save();
            }
        }
        
  
        // Send success response
        res.json({ success: true, message: 'Order placed successfully!' });
    } catch (error) {
        console.error('Error during order placement:', error);
        res.status(500).json({ success: false, message: 'Failed to place order. Please try again.' });
    }
  });
  

// Fetch all orders (GET request)
router.get('/checkout', async (req, res) => {
    try {
        const orders = await Order.find(); // Fetches all orders from the database
        res.json(orders); // Sends the orders as JSON
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
    }
});



module.exports = router;