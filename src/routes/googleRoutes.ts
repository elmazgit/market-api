import express from 'express';
import passport from 'passport';
import asyncHandler from 'express-async-handler';

const googleRouter = express.Router();

// Route to start the Google OAuth flow
googleRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google to redirect to after successful login
googleRouter.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failed'
}));

// Success route after login
googleRouter.get('/login/success', asyncHandler(async (req, res, next) => {
  try {
    if (req.user) {
        res.status(200).json({
        status: true,
        message: 'Login Successful',
        user: req.user,  // User data from session
        auth: 'google',
        });
    } else {
        next(new Error('Authentication failed'));
    }}
  catch(error) {
    next(error);
  }
}));

// Failed route for login
googleRouter.get('/login/failed', asyncHandler(async (req, res) => {
  res.status(401).json({
    status: false,
    message: 'Login failed',
  });
}));

// Logout route to end session
googleRouter.get('/auth/logout', asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
}));

export default googleRouter;
