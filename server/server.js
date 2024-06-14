const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from static directory
app.use(express.static(path.join(__dirname, '../static')));

// Serve transpiled files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve the index.html as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
