// Middleware to check if user is authenticated
module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  },
};
