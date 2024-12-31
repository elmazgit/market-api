import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import googleRouter from './routes/googleRoutes'; // Import Google authentication routes
import './config/passport';
import { testConnection } from './config/db'; // Import the database connection logic
import cors from 'express';

dotenv.config(); 

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  }));

//const cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(cors());  // Enable CORS for all routes

// Initialize Passport.js and session handling
app.use(passport.initialize());
app.use(passport.session());

// Use Google authentication routes
app.use('/', googleRouter);

// Test the database connection on startup
testConnection();

// Your route and middleware setup...
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/greet', (req, res) => {
    res.json({ message: 'Hello from backend' });
  });

// Set up your server to listen on a port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
