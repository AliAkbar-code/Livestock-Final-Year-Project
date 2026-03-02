// const express = require('express');
// const router = express.Router();
// const natural = require('natural');
// const Animal = require('../models/animalmodel'); // Adjust the path to your model file

// // Define possible values
// // router.get('/search', async (req, res) => {
// //     try {
// //         const { query } = req.query; // Get the search query from the URL
// //         let searchCriteria = {};

// //         if (query) {
// //             // Extract filters from the query string
// //             const filters = query.match(/(\w+:[^ ]+)/g);  // Matches patterns like "key:value" until a space
// //             let freeTextQuery = query;

// //             if (filters) {
// //                 filters.forEach(filter => {
// //                     const [key, value] = filter.split(':');
// //                     switch (key.toLowerCase()) {
// //                         case 'name':
// //                             searchCriteria.name = { $regex: value, $options: 'i' };
// //                             break;
// //                         case 'age':
// //                             searchCriteria.age = parseInt(value, 10);
// //                             break;
// //                         case 'breed':
// //                             searchCriteria.breed = { $regex: value, $options: 'i' };
// //                             break;
// //                         case 'color':
// //                             searchCriteria.color = { $regex: value, $options: 'i' };
// //                             break;
// //                         case 'location':
// //                             searchCriteria.location = { $regex: value, $options: 'i' };
// //                             break;
// //                         case 'price':
// //                             const [minPrice, maxPrice] = value.split('-').map(Number);
// //                             searchCriteria.price = {};
// //                             if (minPrice) searchCriteria.price.$gte = minPrice;
// //                             if (maxPrice) searchCriteria.price.$lte = maxPrice;
// //                             break;
// //                         // Add more filters as needed
// //                     }
// //                     // Remove the filter part from the free-text search
// //                     freeTextQuery = freeTextQuery.replace(filter, '').trim();
// //                 });
// //             }

// //             if (freeTextQuery) {
// //                 searchCriteria.$or = [
// //                     { name: { $regex: freeTextQuery, $options: 'i' } },
// //                     { breed: { $regex: freeTextQuery, $options: 'i' } },
// //                     { color: { $regex: freeTextQuery, $options: 'i' } },
// //                     { location: { $regex: freeTextQuery, $options: 'i' } }
// //                 ];
// //             }
// //         }

// //         // Query the database
// //         const animals = await Animal.find(searchCriteria);

// //         // Render the results on your marketplace page
// //         res.render('searchResults', { animals });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).send('Server Error');
// //     }
// // });
// // router.get('/search', async (req, res) => {
// //     try {
// //         const { animalType, breed, color, ageRange, location, priceRange } = req.query;
        
// //         // Fetch unique options for filters
// //         const uniqueBreeds = await Animal.distinct('breed');
// //         const uniqueColors = await Animal.distinct('color');
// //         const uniqueLocations = await Animal.distinct('location');

// //         // Construct query based on filters
// //         let query = {};
// //         if (animalType && animalType !== 'all') query.category = animalType;
// //         if (breed && breed !== 'all') query.breed = breed;
// //         if (color && color !== 'all') query.color = color;
// //         if (location && location !== 'all') query.location = location;

// //         // Handle price range
// //         if (priceRange) {
// //             const [minPrice, maxPrice] = priceRange.split('-').map(Number);
// //             query.price = { $gte: minPrice, $lte: maxPrice || Infinity };
// //         }

// //         // Handle age range
// //         if (ageRange) {
// //             let ageQuery = {};
// //             if (ageRange === '0-1') ageQuery = { $lte: 1 };
// //             if (ageRange === '1-3') ageQuery = { $gte: 1, $lte: 3 };
// //             if (ageRange === '3+') ageQuery = { $gte: 3 };
// //             query.age = ageQuery;
// //         }

// //         // Fetch filtered animals
// //         const animals = await Animal.find(query);

// //         res.render('searchResults', {
// //             animals,
// //             uniqueBreeds,
// //             uniqueColors,
// //             uniqueLocations
// //         });
// //     } catch (err) {
// //         res.status(500).send('Error fetching animals.');
// //     }
// // });

// // Assuming you're using Express and Mongoose
// // router.get('/search', async (req, res) => {
// //     try {
// //         const { animalType, breed, color, ageRange, location, priceRange } = req.query;

// //         // Build the query object
// //         let query = {};

// //         if (animalType && animalType !== 'all') {
// //             query.category = animalType;
// //         }

// //         if (breed && breed !== 'all') {
// //             query.breed = breed;
// //         }

// //         if (color && color !== 'all') {
// //             query.color = color;
// //         }

// //         if (location && location !== 'all') {
// //             query.location = location;
// //         }

// //         if (ageRange && ageRange !== 'all') {
// //             let ageQuery;
// //             if (ageRange === '0-1') {
// //                 ageQuery = { $gte: 0, $lte: 1 };
// //             } else if (ageRange === '1-3') {
// //                 ageQuery = { $gt: 1, $lte: 3 };
// //             } else if (ageRange === '3+') {
// //                 ageQuery = { $gt: 3 };
// //             }
// //             query.age = ageQuery;
// //         }

// //         if (priceRange) {
// //             query.price = { $lte: parseInt(priceRange) };
// //         }

// //         // Execute the query
// //         const animals = await Animal.find(query);

// //         // Render the page with the filtered animals
// //         res.render('marketplace', { animals });
// //     } catch (error) {
// //         console.error('Error filtering animals:', error);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // Assuming you have already required your Animal model
// // const Animal = require('./models/animal'); 

// // router.get('/search', async (req, res) => {
// //     try {
// //         // Extract filter criteria from the query string
// //         const { animalType, breed, color, ageRange, location, priceRange } = req.query;

// //         // Build the query object dynamically based on the filters
// //         let query = {};

// //         if (animalType && animalType !== 'all') query.category = animalType;
// //         if (breed && breed !== 'all') query.breed = breed;
// //         if (color && color !== 'all') query.color = color;
// //         if (location && location !== 'all') query.location = location;

// //         // Handle Age Range
// //         if (ageRange && ageRange !== 'all') {
// //             const ageConditions = {
// //                 '0-1': { age: { $gte: 0, $lte: 1 } },
// //                 '1-3': { age: { $gte: 1, $lte: 3 } },
// //                 '3+': { age: { $gte: 3 } }
// //             };
// //             query.age = ageConditions[ageRange].age;
// //         }

// //         // Handle Price Range
// //         if (priceRange) {
// //             query.price = { $lte: parseInt(priceRange) };
// //         }

// //         // Query the database with the filters
// //         const animals = await Animal.find(query);

// //         // Render the page with the filtered results
// //         res.render('searchResults', { animals });
// //     } catch (error) {
// //         console.error('Error while searching for animals:', error);
// //         res.status(500).send('An error occurred while searching for animals.');
// //     }
// // });

// // router.get('/marketplace', async (req, res) => {
// //     try {
// //         const breeds = await Animal.distinct('breed');
// //         const colors = await Animal.distinct('color');
// //         const locations = await Animal.distinct('location');

// //         res.render('searchResults', { breeds, colors, locations });
// //     } catch (error) {
// //         console.error('Error fetching filter options:', error);
// //         res.status(500).send('An error occurred while fetching filter options.');
// //     }
// // });



// module.exports = router;


// 

const express = require('express');
const router = express.Router();
const Animal = require('../models/animalmodel'); // Adjust the path according to your project structure

router.get('/search', async (req, res) => {
    try {
        // Get the filters from the query parameters
        const { name, ageRange, breed, color, location, priceRange, animalType } = req.query;

        // Initialize the query object
        let query = {};

        // Handle name filter (case-insensitive search)
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive match for name
        }

        // Handle age range filter
        if (ageRange && ageRange !== 'all') {
            const ageQuery = {};
            if (ageRange === '0-1') ageQuery.$lte = 1; // Age <= 1 year
            else if (ageRange === '1-3') ageQuery.$gte = 1, ageQuery.$lte = 3; // Age between 1 and 3 years
            else if (ageRange === '3+') ageQuery.$gte = 3; // Age >= 3 years
            query.age = ageQuery;
        }

        // Handle breed filter
        if (breed && breed !== 'all') {
            query.breed = breed;
        }

        // Handle color filter
        if (color && color !== 'all') {
            query.color = color;
        }

        // Handle location filter
        if (location && location !== 'all') {
            query.location = location;
        }

        // Handle price range filter
        if (priceRange && priceRange !== '0') {
            const maxPrice = parseInt(priceRange, 10);
            if (!isNaN(maxPrice)) {
                query.price = { $lte: maxPrice }; // Price less than or equal to the max price
            }
        }

        // Handle animal type filter
        if (animalType && animalType !== 'all') {
            query.category = animalType;
        }

        // Fetch animals from the database based on the query
        const animals = await Animal.find(query);

        // If no animals match, send an empty list or message
        if (animals.length === 0) {
            console.log('No animals found with the applied filters');
            res.render('searchResults', { animals: [], message: 'No animals found matching the filters.' });
            return;
        }

        // Render the search results
        res.render('searchResults', { animals });

    } catch (error) {
        console.error('Error fetching animals:', error);
        res.status(500).send('An error occurred while fetching animals.');
    }
});











module.exports = router;