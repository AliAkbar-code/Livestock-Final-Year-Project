function checkSeller(req, res, next) {
    if (req.session && req.session.seller) {
      return next(); // Proceed if session contains seller
    }
    res.redirect('/accessdeny'); // Redirect to login if not authenticated
  }
  
  module.exports = checkSeller;
  