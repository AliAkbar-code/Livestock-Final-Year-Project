const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sellerModel = require('../models/sellermodel');
const Doctor = require('../models/doctormodel')
const checkAdmin = require('../middleware/checkAdmin');
const Category = require('../models/categorymodel');
const checkSeller = require("../middleware/checkseller") 
const Animal = require('../models/animalmodel');
const Order = require('../models/ordermodel');
// Route to render the home page
// router.get('/', (req, res) => {
//   res.render('index'); // Assuming you have a home.ejs in your views folder
// });

router.get('/',async (req, res) => {
  try {
    const sellers = await sellerModel.find(); // Fetch all sellers
    const doctors = await Doctor.find();
    res.render('index', { sellers,doctors  }); // Render the 'index' EJS file with sellers data
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to display the registration form
router.get('/addseller', (req, res) => { 
  res.render('addseller'); // Assuming you have a register.ejs in your views folder
});

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, username, password, email, city, phone } = req.body;

    const newSeller = new sellerModel({
      name,
      username,
      password,
      email,
      city,
      phone,
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null // Handle cases with no uploaded file
    });

    await newSeller.save();
    res.redirect('/addseller');
  } catch (err) {
    console.error('Error adding seller:', err);
    res.status(500).send('Failed to add seller');
  }
});

// fetch 
router.get('/', async (req, res) => {
  try {
    const sellers = await seller.find(); // Fetch all sellers
    res.render('index', { sellers }); // Render the 'index' EJS file with sellers data
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/sellerdashboard', checkSeller, async (req, res) => {
  try {
    const categories = await Category.find();
    const orders = await Order.find(); // Fetch all orders for display
    const animals = await Animal.find();
    res.render('sellerdashboard', { categories, orders,animals }); // Pass both categories and orders to the template
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});



// router.get('/listing', checkSeller, async (req, res) => { 
//   try{
//     const animals = await Animal.find();

//     res.render('listing',{animals}); // Assuming you have a register.ejs in your views folder
//   }catch (error){
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.get('/lisitng/:id', async (req, res) => {
  try {
    const animalId = req.params.id;
    const animal = await Animal.findById(animalId);
// console.log(animal);
    console.log("Animal data to render:", animalId); // Log the entire animal object

    if (animal) {
      res.render('list', { animal });
    } else {
      res.status(404).send('Animal not found');
    }
  } catch (error) {
    console.error("Error fetching animal:", error);
    res.status(500).send('Server error');
  }
});


router.get('/seller/profile', async (req, res) => {
  console.log('Seller session:', req.session.seller); // Log the session

  if (!req.session.seller || !req.session.seller._id) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const seller = await sellerModel.findById(req.session.seller._id);
    console.log('Seller found:', seller); // Log the seller object

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json(seller);
  } catch (error) {
    console.error('Error fetching seller profile:', error);
    res.status(500).json({ message: 'Failed to retrieve seller profile' });
  }
});



module.exports = router;