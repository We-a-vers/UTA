require('dotenv').config()

const express = require('express');
var cors = require('cors')
const jwt = require('jsonwebtoken');

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Route to generate JWT token (login)
app.post('/login', (req, res) => {

    const {password} = req.body;
  
    // Check if the provided passcode matches the one in the .env file
    if (password === process.env.PASSWORD) {
      // Generate a JWT token

      res.status(200).json({ message: 'Authentication successful' });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });