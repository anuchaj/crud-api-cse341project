const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google login
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.json({ message: 'Logged in with Google', user: req.user });
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
