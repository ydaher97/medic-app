
const express = require('express');
const router = express.Router();
const quizzesController = require('../controllers/quiz');

// Define your routes and their corresponding controller functions
router.get('/',quizzesController.fitchAll);
// Add other routes as needed

  

module.exports = router;

