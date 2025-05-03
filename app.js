const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Simulated database (for testing)
let mockDatabase = [];

// GET (Homepage)
app.get('/', (req, res) => {
  res.send('<h1>Performance Testing Page</h1><p>This is a simple page to test performance.</p>');
});

// GET (API endpoint to fetch data)
app.get('/api/data', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    data: mockDatabase,
    count: mockDatabase.length 
  });
});

// POST (API endpoint to store data)
app.post('/api/data', (req, res) => {
  const { name, age } = req.body;
  
  if (!name || !age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  const newEntry = { name, age, timestamp: new Date() };
  mockDatabase.push(newEntry);
  
  res.status(201).json({ 
    status: 'success', 
    received: newEntry 
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});