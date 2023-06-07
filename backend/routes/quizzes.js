
const express = require('express');
const router = express.Router();
const quizzesController = require('../controllers/quiz');
const QuestionController = require('../controllers/question');


// Define your routes and their corresponding controller functions
router.get('/',quizzesController.fitchAll);
// Add other routes as needed

router.get('/questions', QuestionController.fitchAll);
  

module.exports = router;

