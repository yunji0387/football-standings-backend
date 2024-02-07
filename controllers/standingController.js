const Standing = require('../models/standing');

// Assuming your file is a JS module, you should use `exports` instead of `export`
exports.createStanding = async (req, res) => {
    try {
        // Create a new standing instance using the request body data
        const standing = new Standing(req.body);

        // Save the new standing to the database
        await standing.save();

        // Send back the created standing as a response
        res.status(201).json({
            success: true,
            data: standing
        });
    } catch (error) {
        // If an error occurs, send back an error message
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
