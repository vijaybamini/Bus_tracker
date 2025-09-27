const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.resolve(__dirname, 'public')));

// Store latest bus location
let busLocations = [];

// Driver posts location
app.post('/update-location', (req, res) => {
  const { lat, lng } = req.body;
  if (lat && lng) {
    busLocations = [{ lat, lng, timestamp: Date.now() }];
    console.log('Location updated:', busLocations);
    res.sendStatus(200);
  } else {
    res.status(400).send('Invalid location');
  }
});

// Commuter fetches location
app.get('/get-locations', (req, res) => {
  
  res.json(busLocations);
});

// Test root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
