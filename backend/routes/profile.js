
const express = require('express');
const router = express.Router();
const ScoreController = require('../controllers/userquiz');


// Define your routes and their corresponding controller functions
router.get('/',ScoreController.fitchAll);
// Add other routes as needed

router.post('/', ScoreController.score);
  

module.exports = router;

