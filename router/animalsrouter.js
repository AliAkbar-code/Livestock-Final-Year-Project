const express = require('express');
  const router = express.Router();
  const Animal = require('../models/animalmodel');
  const Category = require('../models/categorymodel');
  const multer = require('multer');
  const cartItems = require('../models/cartmodel');
  const mongoose = require('mongoose');

  // router.get('/addanimalform', (req, res) => { 
  //     res.render('addanimalform'); // Assuming you have a register.ejs in your views folder
  //   });

    router.get('/addcategoryform', (req, res) => { 
      res.render('addcategoryform'); // Assuming you have a register.ejs in your views folder
    });

    router.get('/cart', (req, res) => { 
      res.render('cart'); // Assuming you have a register.ejs in your views folder
    });
    router.get('/addcarrt', (req, res) => { 
      res.render('cart'); // Assuming you have a register.ejs in your views folder
    });

    
    router.get('/payment' , (req ,res) =>{
      res.render('payment');
    });
    router.get('/addseller' , (req ,res) =>{
      res.render('addseller');
    });
  //   router.post('/addanimal', async (req, res) => {
  //     const { name, age, breed, color, price, location, category } = req.body;

  //     try {
  //         // Create a new animal document
  //         const newAnimal = new Animal({
  //             name,
  //             age,
  //             breed,
  //             color,
  //             price,
  //             location,
  //             category
  //         });

  //         // Save the animal to the database
  //         await newAnimal.save();

  //         // Redirect to a page showing the animal list or a success message
  //         res.redirect('/admindashboard'); // Assuming '/animals' is the route that lists animals
  //     } catch (error) {
  //         console.error('Error adding animal:', error);
  //         res.status(500).send('Internal Server Error'); // or display an error message
  //     }
  // });

  // router.post('/addcategory', async (req, res) => {
  //     const { categoryName } = req.body;

  //     try {
  //         // Create a new category document
  //         const newCategory = new Category({
  //             name: categoryName
  //         });

  //         // Save the category to the database
  //         await newCategory.save();

  //         // Redirect to a page showing the category list or a success message
  //         res.redirect('/admindashboard'); // Assuming '/categories' is the route that lists categories
  //     } catch (error) {
  //         console.error('Error adding category:', error);
  //         res.status(500).send('Internal Server Error'); // or display an error message
  //     }
  // });

  // routes/category.js

  // Route to fetch and display categories
//   router.get('/addcategory', async (req, res) => {
//     try {
//         const categories = await Category.find(); // Fetch all categories
//         console.log('Fetched Categories:', categories);
//         res.render('admindashboard', { categories }); // Replace 'your-template-file' with the name of your EJS file
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  // POST route to handle form submission
  router.post('/addanimal', upload.single('image'), (req, res) => {
    const { name, age, breed, color, price, location, category, stock } = req.body;
    const image = req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : null;

    const newAnimal = new Animal({
      name,
      age,
      breed,
      color,
      price,
      location,
      category,
      stock: parseInt(stock), // Convert stock to an integer
      image
    });

    newAnimal.save()
        .then(() => res.redirect('/addanimalform'))
        .catch(err => res.status(500).send('Error adding animal: ' + err));
});

  // Route to serve images
router.get('/image/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (animal && animal.image && animal.image.data) {
      res.set('Content-Type', animal.image.contentType);
      res.send(animal.image.data);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving image: ' + error.message);
  }
});



  router.get('/home', async (req, res) => {
    try {
      const animals = await Animal.find();
      res.render('home', { animals });
    } catch (err) {
      res.status(500).send('Error fetching animals: ' + err);
    }
  });

  router.get('/sellerdashboard', async (req, res) => {
    try {
      const animal = await Animal.find();
      res.render('sellerdashboard', { animal });
    } catch (err) {
      res.status(500).send('Error fetching animals: ' + err);
    }
  });





// router.get('/search', async (req, res) => {
//   try {
//       const searchQuery = {};

//       if (req.query.name) {
//           searchQuery.name = { $regex: new RegExp(req.query.name, 'i') };
//       }
//       if (req.query.age) {
//           searchQuery.age = req.query.age;
//       }
//       if (req.query.color) {
//           searchQuery.color = { $regex: new RegExp(req.query.color, 'i') };
//       }
//       if (req.query.breed) {
//           searchQuery.breed = { $regex: new RegExp(req.query.breed, 'i') };
//       }
//       if (req.query.price) {
//           searchQuery.price = { $lte: req.query.price };
//       }
//       if (req.query.location) {
//           searchQuery.location = { $regex: new RegExp(req.query.location, 'i') };
//       }

//       // Fetch animals based on search query
//       const animals = await Animal.find(searchQuery);

//       res.render('marketplace', { animals });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//   }
// });


 // Import your Category model

router.get('/addanimalform', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories from the database
        res.render('addanimalform', { categories }); // Pass categories to the view
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/list', async (req, res) => {
  try {
      const animal = await Animal.find(); // Fetch all categories from the database
      res.render('list', { animal }); // Pass categories to the view
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

// router.get('/search', async (req, res) => {
//   try {
//       const searchQuery = {};

//       if (req.query.name) {
//           searchQuery.name = { $regex: new RegExp(req.query.name, 'i') };
//       }
//       if (req.query.age) {
//           searchQuery.age = req.query.age;
//       }
//       if (req.query.color) {
//           searchQuery.color = { $regex: new RegExp(req.query.color, 'i') };
//       }
//       if (req.query.breed) {
//           searchQuery.breed = { $regex: new RegExp(req.query.breed, 'i') };
//       }
//       if (req.query.maxPrice) {
//           searchQuery.price = { $lte: req.query.maxPrice };
//       }
//       if (req.query.location) {
//           searchQuery.location = { $regex: new RegExp(req.query.location, 'i') };
//       }
//       if (req.query.type) {
//           searchQuery.type = req.query.type;
//       }

//       // Fetch animals based on search query
//       const animals = await Animal.find(searchQuery);

//       res.render('searchResults', { animals });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//   }
// });

// add to cart router 

// router.get('/lisitng/:id', async (req, res) => {
//   try {
//     const animalId = req.params.id;
//     const animal = await Animal.findById(animalId);

//     console.log("Animal data to render:", animalId); // Log the entire animal object

//     if (animal) {
//       res.render('lisitng', { animal });
//     } else {
//       res.status(404).send('Animal not found');
//     }
//   } catch (error) {
//     console.error("Error fetching animal:", error);
//     res.status(500).send('Server error');
//   }
// });

// router.get('/listing/:id', async (req, res) => {
//   try {
//       const animalId = req.params.id;

//       // Check if the ID is a valid ObjectId
//       if (!mongoose.Types.ObjectId.isValid(animalId)) {
//           return res.status(400).send('Invalid animal ID');
//       }

//       const animal = await Animal.findById(animalId);
//        console.log(animal);
      
//       console.log("Animal ID:", animalId);  // Log the animal ID
//       console.log("Fetched animal from DB:", animal); // Log the result

//       if (animal) {
//           res.render('listing', { animal }); // Make sure this matches your view name
//       } else {
//           res.status(404).send('Animal not found');
//       }
//   } catch (error) {
//       console.error("Error fetching animal:", error);
//       res.status(500).send('Server error');
//   }
// });


  module.exports = router;