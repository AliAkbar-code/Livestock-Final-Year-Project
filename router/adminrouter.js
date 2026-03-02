const express = require('express');
const router = express.Router();
const Admin = require('../models/adminmodel');
const Category = require('../models/categorymodel');
const User =  require('../models/usermodel');
const Seller =  require('../models/sellermodel');
const Doctor =  require('../models/doctormodel');
const Animal = require('../models/adminmodel');
const Contact = require('../models/contactmodel'); 

const checkAdmin = require('../middleware/checkAdmin');
const checkSeller = require('../middleware/checkseller');



router.get('/adminsignup', (req, res) => { 
    res.render('adminsignup'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/aliprofile', (req, res) => { 
    res.render('aliprofile'); // Assuming you have a register.ejs in your views folder
  });
  router.get('/ahmadprofile', (req, res) => { 
    res.render('ahmadprofile'); // Assuming you have a register.ejs in your views folder
  });
  router.get('/umairprofile', (req, res) => { 
    res.render('umairprofile'); // Assuming you have a register.ejs in your views folder
  });

  // router.get('/admindashboard', (req, res) => { 
  //   res.render('admindashboard'); // Assuming you have a register.ejs in your views folder
  // });

  // router.get('/sellerdashboard', checkSeller, (req, res) => { 
  //   res.render('sellerdashboard'); // Assuming you have a register.ejs in your views folder
  // });

  router.get('/doctordashboard', (req, res) => { 
    res.render('doctordashboard'); // Assuming you have a register.ejs in your views folder
  });

  // router.get('/informationabouthteanimal', (req, res) => { 
  //   res.render('informationabouthteanimal'); // Assuming you have a register.ejs in your views folder
  // });
  
  router.get('/paymentcomplete', (req, res) => { 
    res.render('paymentcomplete'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/accessdeny', (req, res) => { 
    res.render('accessdeny'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/erroe', (req, res) => { 
    res.render('erroe'); // Assuming you have a register.ejs in your views folder
  });


  const allowedAdminUsernames = ['aliakbar200', 'ahmad168', 'umair196'];

router.post('/adminsignup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username is one of the predefined allowed usernames
        if (!allowedAdminUsernames.includes(username)) {
            // alert("You can't Sign up ");
            return res.status(400).send('Invalid username. You are not authorized to sign up as an admin.');
        }

        // Check if the admin already exists by username or email
        const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(400).send('Admin with this username or email already exists.');
            // alert("You can't Sign up ");
        }

        // Create a new admin
        const newAdmin = new Admin({
            username,
            email,
            password // Ensure to hash the password in production environments
        });

        await newAdmin.save();
        res.redirect('/admindashboard'); // Redirect to the admin dashboard after successful signup
    } catch (err) {
        console.error('Error during admin signup:', err);
        res.status(500).send('Server error');
    }
});


// router.get('/managecategories', async (req, res) => {
//   try {
//       const categories = await Category.find(); // Fetch all categories from the database
//       res.render('managecategories', { categories }); // Render the EJS template and pass categories
//   } catch (error) {
//       res.status(500).send('Server Error');
//   }
// });


router.post('/addcategory', async (req, res) => {
  const { categoryName } = req.body;

  try {
      // Create a new category document
      const newCategory = new Category({
          name: categoryName
      });

      // Save the category to the database
      await newCategory.save();

      // Redirect to a page showing the category list or a success message
      res.redirect('/admindashboard'); // Assuming '/categories' is the route that lists categories
  } catch (error) {
      console.error('Error adding category:', error);
      res.status(500).send('Internal Server Error'); // or display an error message
  }
});

// routes/category.js

// Route to fetch and display categories
// Ensure that this route is correctly used to fetch and display categories
// router.get('/admindashboard', async (req, res) => {
//   try {
//       const categories = await Category.find(); // Fetch all categories
//     //   const User = await User.find();
//       // console.log('Fetched Categories:', categories);
//     //   res.render('admindashboard', { User });
//       res.render('admindashboard', { categories }); // Render the EJS template and pass categories
//   } catch (error) {
//       console.error('Error fetching categories:', error);
//       res.status(500).send('Internal Server Error');
//   }
// });
// router.get('/admindashboard', async (req, res) => {
//     try {
//         const User = await User.find(); // Fetch all categories
//         // console.log('Fetched Categories:', categories);
//         res.render('admindashboard', { User }); // Render the EJS template and pass categories
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         res.status(500).send('Internal Server Error');
//     }
//   });

router.get('/admindashboard' ,checkAdmin, async (req, res) => {
    try {
      const categories = await Category.find(); // Fetch all categories
      const users = await User.find(); // Fetch all users
      const sellers = await Seller.find();
      const doctors = await Doctor.find();
      // const animals = await Animal.find();
      // Render the EJS template and pass both categories and users
      res.render('admindashboard', { categories, users ,sellers,doctors  });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  

  
// router.get('/admindashboard', async (req, res) => {
//   try {
//     // const categories = await Category.find(); // Fetch all categories
//     // const users = await User.find(); // Fetch all users
//     // const sellers = await Seller.find();
//     // const doctors = await Doctor.find();
//     const animals = await Animal.find();
//     // Render the EJS template and pass both categories and users
//     res.render('sellerdashboard', { animals });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });



// const check = require('../middleware/check'); // Update path as needed

// Admin dashboard route


// Protect the admin dashboard route with checkAdmin middleware
router.delete('/delete-user/:id', async (req, res) => {
  const userId = req.params.id;
  console.log('User ID to delete:', userId);  // Log the user ID
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);  // Log the error
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});


router.get('/admin/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 }); // Sort by latest messages
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to retrieve messages' });
  }
});


router.get('/admin/profile', async (req, res) => {
  // Check if the admin session exists
  if (!req.session.admin || !req.session.admin._id) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    // Fetch the admin profile using the ID from the session
    const admin = await Admin.findById(req.session.admin._id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ message: 'Failed to retrieve admin profile' });
  }
});

  module.exports = router;