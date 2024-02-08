const fetch = require('node-fetch');
const Standing = require('../models/standing');
require("dotenv").config();

exports.createStanding = async (req, res) => {
    const { code } = req.params; // Extract the code from the request URL parameter

    const url = `https://api.football-data.org/v4/competitions/${code}/matches`;
    const options = {
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.FOOTBALL_API_KEY // Use your API token here
        }
    };

    // Use fetch with .then() syntax
    fetch(url, options)
        .then(apiRes => {
            if (!apiRes.ok) {
                throw new Error(`Error fetching data: ${apiRes.statusText}`);
            }
            return apiRes.json(); // Parse the JSON response
        })
        .then(data => {
            // Check if the standing already exists in the database
            return Standing.findOne({ 'competition.code': code }).then(existingStanding => {
                if (existingStanding) {
                    // If standing exists, respond with a conflict error
                    res.status(409).json({
                        success: false,
                        message: 'Standing for this competition code already exists.'
                    });
                    return Promise.reject(new Error('Standing already exists.'));
                } else {
                    // Create a new standing instance using the fetched data
                    const standing = new Standing(data);
                    return standing.save(); // Save the new standing to the database
                }
            });
        })
        .then(standing => {
            // Send back the created standing as a response
            res.status(201).json({
                success: true,
                data: standing
            });
        })
        .catch(error => {
            // If an error occurs, send back an error message
            if (!res.headersSent) { // Check if response is already sent to avoid "headers already sent" error
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
        });
};

// Assuming your file is a JS module, you should use `exports` instead of `export`
// exports.createStanding = async (req, res) => {
//     try {
//         // Extract the code from the request. This example assumes you're passing the code as a URL parameter
//         const { code } = req.params;

//         const options = {
//             hostname: 'api.football-data.org',
//             port: 443,
//             path: `/v4/competitions/${code}/matches`,
//             method: 'GET',
//             headers: {
//                 'X-Auth-Token': process.env.FOOTBALL_API_KEY
//             }
//         };

//         // External API request
//         const apiReq = https.request(options, apiRes => {
//             let data = '';

//             // A chunk of data has been received.
//             apiRes.on('data', chunk => {
//                 data += chunk;
//             });

//             // The whole response has been received. Send the result.
//             apiRes.on('end', () => {
//                 // Parse the received data and send it as a response to the client
//                 expressRes.json(JSON.parse(data));
//             });
//         });

//         apiReq.on('error', error => {
//             console.error(error);
//             // Send error response
//             expressRes.status(500).send('Error occurred while fetching data');
//         });

//         apiReq.end();

//         // Create a new standing instance using the request body data
//         const standing = new Standing(data);

//         // Save the new standing to the database
//         await standing.save();

//         // Send back the created standing as a response
//         res.status(201).json({
//             success: true,
//             data: standing
//         });
//     } catch (error) {
//         // If an error occurs, send back an error message
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

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