const express = require('express');
const router = express.Router();



router.get('/Fodder', (req, res) => { 
    res.render('Fodder'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/cow', (req, res) => { 
    res.render('cow'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/goats', (req, res) => { 
    res.render('goats'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/chickens', (req, res) => { 
    res.render('chickens'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/dogs', (req, res) => { 
    res.render('dogs'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/sheep', (req, res) => { 
    res.render('sheep'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/horses', (req, res) => { 
    res.render('horses'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/donkey', (req, res) => { 
    res.render('donkey'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/buffalo', (req, res) => { 
    res.render('buffalo'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/cat', (req, res) => { 
    res.render('cat'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/rabbits', (req, res) => { 
    res.render('rabbits'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/camel', (req, res) => { 
    res.render('camel'); // Assuming you have a register.ejs in your views folder
  });

  router.get('/ducks', (req, res) => { 
    res.render('ducks'); // Assuming you have a register.ejs in your views folder
  });








module.exports = router;