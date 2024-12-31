import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findOrCreateUser, findUserById } from '../repositories/userRepository'; // Import the repository functions
import dotenv from 'dotenv';

dotenv.config();

interface GoogleProfile {
    id: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    picture?: string;
    // Add more properties depending on what Google returns
}

// Passport configuration for Google OAuth 2.0
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        passReqToCallback: true,
        scope: ['profile', 'email'],
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const {given_name, family_name, email, picture } = profile._json as unknown as GoogleProfile;
  
          // Use the repository function to find or create the user
          const user = await findOrCreateUser(profile.id, given_name, family_name, email, picture, 'google');
  
          // Pass user object to session
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  
  // Serialize the user into the session (store the user ID in the session)
  passport.serializeUser((user: any, done) => {
      done(null, user.id);
  });
  
  // Deserialize the user from the session using the repository
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await findUserById(id);  // Fetch user from the repository
      done(null, user);  // Return the user object
    } catch (error) {
      done(error, null);  // If there was an error fetching the user, return it
    }
  });