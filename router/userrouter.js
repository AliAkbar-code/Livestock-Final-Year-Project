const express = require('express');
const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/usermodel');
const seller = require('../models/sellermodel');
const Doctor = require('../models/doctormodel');
const admin = require('../models/adminmodel'); 
const check = require('../middleware/checkAdmin');


router.get('/addusers', (req, res) => { 
    res.render('addusers'); // Assuming you have a register.ejs in your views folder
  });


  // router.get('/admindashboard', check, (req, res) => {
  //   res.render('admindashboard', { admin: req.session.admin });
  // });
 
  // router.get('/marketplace', (req, res) => { 
  //   res.render('marketplace'); // Assuming you have a register.ejs in your views folder
  // });



  router.get('/doctormain', (req, res) => { 
    res.render('doctormain'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/finddoctor', async (req, res) => {
    try {
      const doctors = await Doctor.find(); // Fetch doctors from the database
      const user = await User.find(); // Get the logged-in user (if using a session or authentication)
      res.render('finddoctor', { doctors, User }); // Pass both doctors and user to the view
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });
  
  
  router.get('/doctorform', (req, res) => { 
    res.render('doctorform'); // Assuming you have a register.ejs in your views folder
  });
  router.get('/aboutus', async (req, res) => {
    try {
        // Fetch all admins from the database
        const admins = await admin.find();

        if (!admins.length) {
            return res.status(404).send("No admins found");
        }

        // Render the 'aboutus' page with the list of admins
        res.render('aboutus', { admins });
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).send("Server error");
    }
});
// Route to render the admin's profile based on their ID
// router.get('/admin/:adminId', async (req, res) => {
//   try {
//       const admin = await admin.findById(req.params.adminId);

//       if (!admin) {
//           return res.status(404).send("Admin not found");
//       }

//       // Render the admin profile page with the admin's data
//       res.render('adminProfile', { admin });
//   } catch (error) {
//       console.error("Error fetching admin:", error);
//       res.status(500).send("Server error");
//   }
// });


  router.get('/goat', (req, res) => { 
    res.render('goat'); // Assuming you have a register.ejs in your views folder
  });

 

  


  router.post('/signup', async (req, res) => {
    const { fullName, username, email, password, phone } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send('User with this username or email already exists.');
        }

        const newUser = new User({
            fullName,
            username,
            email,
            password,
            phone,
           
        });

        await newUser.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error during signup:', err);  // Enhanced error logging
        res.status(500).send('Server error');
    }
});


// In your login route
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   user.findOne({ username, password }).exec()
//     .then(user => {
//       if (!user) {
//         return res.status(401).send('Invalid credentials');
//       }

//       // Store user info in session
//       req.session.user = user;
//       res.redirect('/home');
//     })
//     .catch(err => {
//       res.status(500).send('Error occurred');
//     });
// });



// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     let existingUser = await user.findOne({ username }).exec();
//     if (existingUser && password === existingUser.password) {
//       req.session.user = existingUser;
//       return res.redirect('/home');
//     }

//     let existingSeller = await seller.findOne({ username }).exec();
//     if (existingSeller && password === existingSeller.password) {
//       req.session.seller = existingSeller;
//       return res.redirect('/sellerdashboard');
//     }

//     let existingDoctor = await Doctor.findOne({ username }).exec();
//     if (existingDoctor && password === existingDoctor.password) {
//       req.session.doctor = existingDoctor;
//       return res.redirect('/doctordashboard');
//     }

//     let existingAdmin = await admin.findOne({ username }).exec();
//     if (existingAdmin && password === existingAdmin.password) {
//       req.session.admin = existingAdmin;
//       return res.redirect('/admindashboard');
//     }

//     // If no match found
//     res.status(400).send('Invalid username or password.');
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).send('Server error');
//   }
// });




// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       // Check in User collection
//       let existingUser = await user.findOne({ username });
//       if (existingUser && password === existingUser.password) {
//         return res.redirect('/userdashboard'); // Redirect to user dashboard
//       }
  
//       // Check in Seller collection
//       let existingSeller = await seller.findOne({ username });
//       if (existingSeller && password === existingSeller.password) {
//         return res.redirect('/sellerdashboard'); // Redirect to seller dashboard
//       }
  
//       // Check in Doctor collection
//       let existingDoctor = await Doctor.findOne({ username });
//       if (existingDoctor && password === existingDoctor.password) {
//         return res.redirect('/doctordashboard'); // Redirect to doctor dashboard
//       }
  
//       // Check in Admin collection
//       let existingAdmin = await admin.findOne({ username });
//       if (existingAdmin && password === existingAdmin.password) {
//         // console.log('this is admin');
//         return res.redirect('/admindashboard'); // Redirect to admin dashboard
//       }r
  
//       // If no match found
//       return res.status(400).send('Invalid username or password.');
//     } catch (err) {
//       console.error('Error during login:', err);
//       res.status(500).send('Server error');
//     }
//   });

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user is an admin
    let existingAdmin = await admin.findOne({ username }).exec();
    if (existingAdmin && password === existingAdmin.password) {
      // Set the admin session
      req.session.admin = existingAdmin;
      return res.redirect('/admindashboard'); // Redirect to the admin dashboard
    }

    // Check if the user is a seller
    let existingSeller = await seller.findOne({ username }).exec();
    if (existingSeller && password === existingSeller.password) {
      // Set the seller session
      req.session.seller = existingSeller;
      return res.redirect('/sellerdashboard'); // Redirect to the seller dashboard
    }

    // Check if the user is a doctor
    let existingDoctor = await Doctor.findOne({ username }).exec();
    if (existingDoctor && password === existingDoctor.password) {
      // Set the doctor session
      req.session.doctor = existingDoctor;
      return res.redirect('/doctordashboard'); // Redirect to the doctor dashboard
    }

    // Check if the user is a regular user
    let existingUser = await User.findOne({ username }).exec();
    if (existingUser && password === existingUser.password) {
      // Set the user session
      req.session.user = existingUser;
      return res.redirect('/'); // Redirect to the user dashboard
    }

    // If no match is found for any role
    res.status(400).send('Invalid username or password.');
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Server error');
  }
});

// routes/logout.js
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/addusers'); // Handle error if needed
    }
    res.redirect('/');
  });
});

// routes/logout.js


// ya original ha 
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Check in User collection
//         let user = await user.findOne({ username });
//         if (user && password === user.password) {
//             return res.redirect('/userdashboard'); // Redirect to user dashboard
//         }

//         // Check in Seller collection
//         let seller = await seller.findOne({ username });
//         if (seller && password === seller.password) {
//             return res.redirect('/sellerdashboard'); // Redirect to seller dashboard
//         }

//         // Check in Doctor collection
//         let doctor = await doctor.findOne({ username });
//         if (doctor && password === doctor.password) {
//             return res.redirect('/doctordashboard'); // Redirect to doctor dashboard
//         }

//         // Check in Admin collection
//         let admin = await admin.findOne({ username });
//         if (admin && password === admin.password) {
//             return res.redirect('/admindashboard'); // Redirect to admin dashboard
//         }

//         // If no match found
//         return res.status(400).send('Invalid username or password.');
//     } catch (err) {
//         console.error('Error during login:', err);
//         res.status(500).send('Server error');
//     }
// });



// Login Route
// router.post('/login', async (req, res) => {
//   // console.log(req.body); // Log the incoming data
//   const { username, password } = req.body;

//   try {
//       // Find the user by username
//       const user = await User.findOne({ username });
//       if (!user) {
//           return res.status(400).send('Invalid username.');
//       }

//       // Directly compare the input password with the stored password
//       if (password !== user.password) {
//           return res.status(400).send('Invalid password.');
//       }

//       // Successful login
//       res.redirect('/'); // Redirect to the home page after successful login
//   } catch (err) {
//       console.error('Error during login:', err);
//       res.status(500).send('Server error');
//   }
// });



  // router.post('/login', async (req, res) => {
  //   const { username, password } = req.body;

  //   try {
  //     // Check if user already exists
  //     let user = await User.findOne({ username });
  //     if (user) {
  //       return res.send('User already exists');
  //     }
  //     user = new User({ username, password });
  //     await user.save();
  
  //     res.redirect('/dashboard'); // Redirect after successful signup
  //   } catch (err) {
  //     res.status(500).send('Server error');
  //   }
  // });

  // router.post('/addusers', async (req, res) => {
  //   try {
  //     // Create a new seller from the form data
  //     const newSeller = new sellerModel({
  //       name: req.body.name,
  //       password: req.body.password,
  //       email: req.body.email,
  //       city: req.body.city,
  //     });
  
  //     // Save the seller to the database
  //     await newSeller.save();
  
  //     // Redirect to the home page or another success page
  //     res.redirect('/addseller');
  //   } catch (err) {
  //     console.error('Error adding seller:', err);
  //     // Handle error by showing an alert or redirecting to an error page
  //     res.status(500).send('Failed to add seller');
  //   }
  // });





  module.exports = router;