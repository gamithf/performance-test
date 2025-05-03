const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

app.use(express.json());

// Simulated database (for testing)
let mockDatabase = [];

// GET (Homepage)
app.get('/', (req, res) => {
  res.send('<h1>Performance Testing Page</h1><p>This is a simple page to test performance.</p>');
});

app.get('/api/data', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    data: mockDatabase,
    count: mockDatabase.length 
  });
});

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

app.delete('/api/data', (req, res) => {
  mockDatabase = []; // Clear test data
  res.sendStatus(204);
});

app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // limit each IP to 1000 requests per windowMs
}));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});