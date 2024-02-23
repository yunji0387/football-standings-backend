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

app.use(cors())

// Import the standing routes
const standingRoutes = require('./routes/standingRoutes'); // Adjust the path as necessary

// Use the standingRoutes for any requests that are prefixed with '/standings'
app.use('/standings', standingRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Football League Standings Backend Server',
        apiEndpoints: {
            createStandings: {
                method: 'POST',
                uri: '/standings/:code',
                description: 'Add new standings for a specific competition. Replace :code with the actual competition code.'
            },
            readStandings: {
                method: 'GET',
                uri: '/standings/:code',
                description: 'Retrieve the current standings of a specific competition by its code. Replace :code with the actual competition code.'
            },
            updateStandings: {
                method: 'PUT',
                uri: '/standings/:code',
                description: 'Modify the standings data for a specific competition. Replace :code with the actual competition code.'
            },
            deleteStandings: {
                method: 'DELETE',
                uri: '/standings/:code',
                description: 'Remove a competition\'s standings from the database. Replace :code with the actual competition code.'
            }
        },
        note: 'Please ensure to replace :code with the actual competition code you wish to interact with in the provided API endpoints.'
    });
});


if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app; // Export the app instance