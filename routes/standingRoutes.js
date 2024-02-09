const express = require('express');
// Create a Router instance
const router = express.Router();

// Import the controller functions
const {
  createStanding,
  findStandingByCompetitionCode,
  updateStandingByCompetitionCode,
  deleteStandingByCompetitionCode
} = require('../controllers/standingController'); // Adjust the path as necessary

// Route to create a new standing by competition code
router.post('/:code', createStanding);

// Route to retrieve a standing by competition code
router.get('/:code', findStandingByCompetitionCode);

// Route to update a standing by competition code
router.put('/:code', updateStandingByCompetitionCode);

// Route to delete a standing by competition code
router.delete('/:code', deleteStandingByCompetitionCode);

// Export the router
module.exports = router;
