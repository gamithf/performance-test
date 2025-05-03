const express = require('express');
const app = express();
const port = 3000;

// Route for the simple page
app.get('/', (req, res) => {
  res.send('<h1>Performance Testing Page</h1><p>This is a simple page to test performance.</p>');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
