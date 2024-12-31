import { db } from '../config/db'; // Import the centralized database connection

// Find a user by their ID (to be used in deserializeUser)
export const findUserById = async (id: string) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0]; // Return the user if found, or null if not found
};

// Find a user by their Google OAuth ID (auth_provider_id)
export const findUserByGoogleId = async (authProviderId: string) => {
  const result = await db.query('SELECT * FROM users WHERE auth_provider_id = $1', [authProviderId]);
  return result.rows[0]; // Return the user if found, or null if not found
};

// Function to find or create a user from Google OAuth data
export const findOrCreateUser = async (authProviderId: string, firstname?: string, lastname?: string, email?: string, userImage?: string, authProvider?: string) => {
  const existingUser = await findUserByGoogleId(authProviderId);

  if (existingUser) {
    return existingUser; // Return existing user if found
  }

  // Create new user if not found
  const query = `
    INSERT INTO users (auth_provider_id, firstname, lastname, email, user_image, auth_provider)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;
  const newUser = await db.query(query, [authProviderId, firstname, lastname, email, userImage, authProvider]);
  return newUser.rows[0]; // Return the newly created user
};
