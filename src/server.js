const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;

app.use(cors());  // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Hello From Backend!');
});

app.get('/api/greet', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
