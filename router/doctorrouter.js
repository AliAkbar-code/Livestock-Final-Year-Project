const express = require('express');
const router = express.Router();
const doctor = require('../models/doctormodel');
const seller = require('../models/sellermodel');
const multer = require('multer');
const path = require('path');
const user = require('../models/usermodel');
const Chat = require('../models/chatmodel');
// const Appointment = require('../models/appointmentmodel');

// const path = require('path');
// const multer = require('multer');
router.get('/adddoctor', async (req, res) => {
  res.render('adddoctor'); // Ensure 'adddoctor.ejs' exists in your views folder
});
const checkUser = require('../middleware/checkuser');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle doctor registration
router.post('/adddoctor', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      phone,
      specialty,
      experience,
      qualifications,
      availableHours,
      consultationFee,
      location // Add location to destructuring
    } = req.body;

    const newDoctor = new doctor({
      name,
      username,
      email,
      password,
      phone,
      specialty,
      experience: experience ? Number(experience) : 0, // Convert experience to a number and default to 0 if empty
      qualifications,
      availableHours,
      consultationFee: consultationFee ? Number(consultationFee) : 0, // Convert fee to a number and default to 0 if empty
      location, // Add location to the doctor model
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null, // Handle cases with no uploaded file
    });

    await newDoctor.save();
    res.redirect('/adddoctor');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering doctor');
  }
});


// Route to serve individual doctor profile
router.get('/doctor/:id', async (req, res) => {
  try {
    const Doctor = await doctor.findById(req.params.id);
    if (!Doctor) {
      return res.status(404).send('Doctor not found');
    }
    res.render('doctorprofile', { Doctor });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching doctor details');
  }
});

router.get('/seller/:id', async (req, res) => {
  try {
    const Seller = await seller.findById(req.params.id);
    if (!Seller) {
      return res.status(404).send('Doctor not found');
    }
    res.render('sellerprofile', { Seller });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching doctor details');
  }
});



  router.get('/expertsystem', checkUser, async (req, res) => { 
    res.render('expertsystem'); // Assuming you have a register.ejs in your views folder
  });
 // Assuming this is in your router file
 router.get('/chat', (req, res) => {
  const { doctorId, User } = req.query; // Assuming you are getting these from the query parameters
  res.render('chat', { doctorId, User  });
});


router.get('/doctorChat', async (req, res) => {
  const doctor = req.session.doctor;

  if (!doctor) {
    return res.redirect('/addusers'); // Redirect to login if not logged in
  }

  try {
    // Fetch messages for this doctor
    const messages = await Chat.find({ doctorId: doctor._id });

    res.render('doctorChat', { doctor, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error loading chat.');
  }
});
  

// Fetch messages for a user-doctor chat session
//Chat route to render user or doctor chat page
// chatRouter.js
router.get('/chat/messages', async (req, res) => {
  const { doctorId } = req.query;

  if (!doctorId) {
      return res.status(400).json({ error: 'Missing doctor ID' });
  }

  try {
      // Fetch messages with doctorId and include both user and doctor messages
      const messages = await Chat.find({ doctorId }).sort({ timestamp: 1 });
      
      res.status(200).json({ messages });
  } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to load messages' });
  }
});




  
  
  
  // const multer = require('multer');

// Set up memory storage
// 


// Initialize upload
// router.post('/appointments', async (req, res) => {
//   const { doctorId, appointmentDate, appointmentTime } = req.body;

//   // Ensure that the user is logged in
//   if (!req.session.user || !req.session.user._id) {
//     return res.status(400).send('User must be logged in to book an appointment.');
//   }

//   const userId = req.session.user._id;

//   try {
//     const newAppointment = new Appointment({
//       doctorId,
//       userId,  // Use the userId from the session
//       appointmentDate,
//       appointmentTime,
//     });

//     await newAppointment.save();
    
//     // Redirect to the doctor's profile page with a success message
//     res.redirect(/doctor/${doctorId}?success=true);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error booking the appointment.');
//   }
// });

// router.get('/doctordashboard', async (req, res) => {
//   try {
//     const users = await user.find(); 
//     const appointments = await Appointment.find()
//       .populate('doctorId', 'name location specialization') // Populate doctor details
//       .populate('userId', 'fullName email phone') // Populate user details
//       .sort({ appointmentDate: 1, appointmentTime: 1 }); // Sort appointments by date and time

//     res.render('doctordashboard', { appointments,users }); // Pass appointments to the EJS template
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });




  module.exports = router;
