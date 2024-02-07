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

//get specific standing by code
exports.findStandingByCompetitionCode = async (req, res) => {
    try {
        // Extract the code from the request. This example assumes you're passing the code as a URL parameter
        const { code } = req.params;

        // Find the standing document where the competition.code matches the code from the request
        const standing = await Standing.findOne({ 'competition.code': code });

        // If no standing is found, return a 404 Not Found response
        if (!standing) {
            return res.status(404).json({
                success: false,
                message: 'Standing not found for the provided competition code'
            });
        }

        // If a standing is found, return it with a 200 OK response
        res.status(200).json({
            success: true,
            data: standing
        });
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};