const express = require('express');
const https = require('https');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Define a route for GET requests on the home page
app.get('/pl', (expressReq, expressRes) => {
    const options = {
        hostname: 'api.football-data.org',
        port: 443,
        path: '/v4/competitions/PL/standings',
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.FOOTBALL_API_KEY
        }
    };

    // External API request
    const apiReq = https.request(options, apiRes => {
        let data = '';

        // A chunk of data has been received.
        apiRes.on('data', chunk => {
            data += chunk;
        });

        // The whole response has been received. Send the result.
        apiRes.on('end', () => {
            // Parse the received data and send it as a response to the client
            expressRes.json(JSON.parse(data));
        });
    });

    apiReq.on('error', error => {
        console.error(error);
        // Send error response
        expressRes.status(500).send('Error occurred while fetching data');
    });

    apiReq.end();
});

app.get('/', (expressReq, expressRes) => {
    const options = {
        hostname: 'api.football-data.org',
        port: 443,
        path: '/v4/competitions/PD/standings',
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.FOOTBALL_API_KEY
        }
    };

    // External API request
    const apiReq = https.request(options, apiRes => {
        let data = '';

        // A chunk of data has been received.
        apiRes.on('data', chunk => {
            data += chunk;
        });

        // The whole response has been received. Send the result.
        apiRes.on('end', () => {
            // Parse the received data and send it as a response to the client
            expressRes.json(JSON.parse(data));
        });
    });

    apiReq.on('error', error => {
        console.error(error);
        // Send error response
        expressRes.status(500).send('Error occurred while fetching data');
    });

    apiReq.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
