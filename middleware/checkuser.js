function checkUser(req, res, next) {
    if (req.session && req.session.user) {
      return next(); // Proceed if session contains user
    }
    res.redirect('/addusers'); // Redirect to login if not authenticated
  }
  
  module.exports = checkUser;
  