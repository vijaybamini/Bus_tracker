const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store locations for multiple drivers by code
let busLocations = {}; // { code: { lat, lng, timestamp } }

// Driver posts location with a code (driver ID)
app.post('/update-location', (req, res) => {
  const { code, lat, lng } = req.body;
  if (code && lat && lng) {
    busLocations[code] = { lat, lng, timestamp: Date.now() };
    console.log(`Location updated for code ${code}:`, busLocations[code]);
    res.sendStatus(200);
  } else {
    res.status(400).send('Invalid location or code');
  }
});

// Commuter fetches all driver locations
app.get('/get-locations', (req, res) => {
  res.json(busLocations);
});

// Serve driver.html
app.get('/driver', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'driver.html'));
});

// Serve commuter.html
app.get('/commuter', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'commuter.html'));
});

// Redirect root to commuter
app.get('/', (req, res) => {
  res.redirect('/commuter');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
