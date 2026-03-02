function checkAdmin(req, res, next) {
  if (req.session && req.session.admin) {
    // console.log(req.session)
    return next(); // Proceed if session contains admin
  }
  res.redirect('/accessdeny'); // Redirect to login if not authenticated
}

module.exports = checkAdmin;
