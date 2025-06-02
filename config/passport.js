const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel');

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user)).catch(err => done(err));
});

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/github/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ githubId: profile.id });
    if (existingUser) return done(null, existingUser);

    const newUser = new User({
      githubId: profile.id,
      username: profile.username,
      email: profile.emails?.[0]?.value || '',
      avatar: profile.photos?.[0]?.value || ''
    });

    await newUser.save();
    done(null, newUser);
  } catch (err) {
    done(err, null);
  }
}));

// callbackURL: 'https://crud-api-oauthja.onrender.com/auth/google/callback', // http://localhost:3000/auth/google/callback for local testing

