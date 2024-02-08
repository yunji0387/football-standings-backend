const express = require('express');
// Create a Router instance
const router = express.Router();

// Import the controller functions
const {
  createStanding,
  findStandingByCompetitionCode,
  updateStandingByCompetitionCode
} = require('../controllers/standingController'); // Adjust the path as necessary

// Route to create a new standing by competition code
router.post('/:code', createStanding);

// Route to retrieve a standing by competition code
router.get('/:code', findStandingByCompetitionCode);

// Route to update a standing by competition code
router.put('/:code', updateStandingByCompetitionCode);

// Export the router
module.exports = router;
