const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

// MongoDB connection without deprecated options
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Import the standing routes
const standingRoutes = require('./routes/standingRoutes'); // Adjust the path as necessary

// Use the standingRoutes for any requests that are prefixed with '/standings'
app.use('/standings', standingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
