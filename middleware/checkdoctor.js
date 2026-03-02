function checkDoctor(req, res, next) {
    if (req.session && req.session.doctor) {
      return next(); // Proceed if session contains doctor
    }
    res.redirect('/login'); // Redirect to login if not authenticated
  }
  
  module.exports = checkDoctor;
  