const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://crud-api-oauthja.onrender.com/auth/google/callback', // http://localhost:3000/auth/google/callback for local testing
    },
    async (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
