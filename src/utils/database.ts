import { Client } from 'pg';

// Set up connection details
const client = new Client({
  host: 'marke-server.postgres.database.azure.com', // Azure PostgreSQL host
  port: 5432, // Default PostgreSQL port
  user: 'avfjheybgs@marke-server', // Admin username with server name appended
  password: 'your-password', // Database password
  database: 'marke-database', // Database name
  ssl: {
    rejectUnauthorized: false, // Allows using SSL connection (important for Azure)
  },
});

// Connect to the PostgreSQL server
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL on Azure');
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  });

// Run a query example (optional)
client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Query error', err.stack);
  } else {
    console.log(res.rows);
  }
  client.end(); // Close the connection
});
