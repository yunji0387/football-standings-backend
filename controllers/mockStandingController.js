// Mock version of standingController.js
const mockData = require('../mock/standingData.json'); // Update the path to the actual location of your JSON file

exports.createStanding = async (req, res) => {
    const { code } = req.params;

    // Directly return the mock data instead of making an API call
    // Assuming your mock data's competition code matches the request parameter
    if (mockData.data.competition.code === code) {
        return res.status(201).json({
            success: true,
            data: mockData.data
        });
    } else {
        return res.status(404).json({
            success: false,
            message: 'The requested competition code does not exist.'
        });
    }
};

exports.findStandingByCompetitionCode = async (req, res) => {
    const { code } = req.params;

    // Check if the competition code matches
    if (mockData.data.competition.code === code) {
        return res.status(200).json({
            success: true,
            data: mockData.data
        });
    } else {
        return res.status(404).json({
            success: false,
            message: 'Standing not found for the provided competition code'
        });
    }
};

exports.updateStandingByCompetitionCode = async (req, res) => {
    // Mock updating data - in reality, this would modify the mock data based on the request, 
    // but here we'll simply return a success response as if the data was updated.
    const { code } = req.params;

    if (mockData.data.competition.code === code) {
        return res.status(200).json({
            success: true,
            message: 'Mock update successful',
            data: mockData.data // In a real scenario, this would be the updated data
        });
    } else {
        return res.status(404).json({
            success: false,
            message: 'Standing not found for the provided competition code'
        });
    }
};

exports.deleteStandingByCompetitionCode = async (req, res) => {
    // Mock deleting data - we'll assume the delete was successful and return a success message.
    const { code } = req.params;

    if (mockData.data.competition.code === code) {
        return res.status(200).json({
            success: true,
            message: 'Standing successfully deleted'
        });
    } else {
        return res.status(404).json({
            success: false,
            message: 'Standing not found for the provided competition code'
        });
    }
};
