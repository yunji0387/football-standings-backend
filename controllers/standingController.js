const https = require('https');
const Standing = require('../models/standing');
require("dotenv").config();

exports.createStanding = async (req, res) => {
    const { code } = req.params; // Extract the code from the request URL parameter

    const options = {
        hostname: 'api.football-data.org',
        port: 443,
        path: `/v4/competitions/${code}/standings`,
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.FOOTBALL_API_KEY // Use your API token here
        }
    };

    let data = '';

    // External API request using https module
    const apiReq = https.request(options, apiRes => {
        apiRes.on('data', chunk => {
            data += chunk;
        });

        apiRes.on('end', async () => { // Making sure the function is async
            try {
                const jsonData = JSON.parse(data);

                // Check if the standing already exists in the database
                const existingStanding = await Standing.findOne({ 'competition.code': code });

                if (existingStanding) {
                    // If standing exists, respond with a conflict error
                    return res.status(409).json({
                        success: false,
                        message: 'Standing for this competition code already exists.'
                    });
                }

                // Create a new standing instance using the fetched data
                const standing = new Standing(jsonData);

                // Save the new standing to the database
                const savedStanding = await standing.save();

                // Send back the created standing as a response
                return res.status(201).json({
                    success: true,
                    data: savedStanding
                });

            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: `Error parsing API response for code ${code}: ${error.message}`
                });
            }
        });
    });

    apiReq.on('error', error => {
        console.error(error);
        return res.status(500).send('Error occurred while fetching data');
    });

    apiReq.end();
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

exports.updateStandingByCompetitionCode = async (req, res) => {
    try {
        // Extract the code from the request parameters
        const { code } = req.params;

        // Find the standing document by competition code and update it with the request body data
        // { new: true } option returns the document after update was applied
        const updatedStanding = await Standing.findOneAndUpdate(
            { 'competition.code': code },
            req.body,
            { new: true, runValidators: true }
        );

        // If no document is found and updated, return a 404 Not Found response
        if (!updatedStanding) {
            return res.status(404).json({
                success: false,
                message: 'Standing not found for the provided competition code'
            });
        }

        // Return the updated document with a 200 OK response
        res.status(200).json({
            success: true,
            data: updatedStanding
        });
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};