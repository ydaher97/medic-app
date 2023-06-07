const express =  require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const quizzesRoutes = require('./routes/quizzes');
const db = require('./util/database');


const errorController = require('./controllers/error');

const app = express();
app.use(cors());


const ports = process.env.Port || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/api/auth', authRoutes);

app.use('/api/posts',postsRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.get('/api/quiz/:quizId/questions', (req, res) => {
    const quizId = req.params.quizId;
    
    // Execute the SQL query to fetch quiz details and questions for the specified quizId
    db.execute(
      `SELECT q.question_id, q.question_text, z.quiz_id, q.question_text AS quiz_name
      FROM question AS q
      INNER JOIN quiz AS z ON q.quiz_id = z.quiz_id
      WHERE z.quiz_id = ?`,
      [quizId]
    )
      .then((results) => {
        const data = results[0];
        
        // Format the result into the desired structure
        const quiz = data.map((row) => ({
          question_id: row.question_id,
          namen: row.quiz_name,
          description: row.quiz_description
        }));
        
        // Send the formatted quiz as a JSON response
        res.json({ quiz });
      })
      .catch((error) => {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the quiz and questions.' });
      });
  });
  
  app.get('/api/questions/:questionId', (req, res) => {
    const quizId = req.params.quizId;
    
    // Execute the SQL query to fetch quiz details and questions for the specified quizId
    db.execute(
      `SELECT a.answer_id, a.answer_text,a.is_correct, q.question_id, a.answer_text AS answer, a.is_correct AS correct
      FROM answer AS a
      INNER JOIN question AS q ON a.question_id = q.question_id
      WHERE q.question_id = ?`,
      [quizId]
    )
      .then((results) => {
        const data = results[0];
        
        // Format the result into the desired structure
        const quiz = data.map((row) => ({
          question_id: row.question_id,
          name: row.answer,
          description: row.correct
        }));
        
        // Send the formatted quiz as a JSON response
        res.json({ quiz });
      })
      .catch((error) => {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the quiz and questions.' });
      });
  });

  app.get('/api/question/:questionId', (req, res) => {
    const questionId = req.params.questionId;
    
    // Execute the SQL query to fetch the question and its answers
    db.execute(
      `SELECT q.question_id, q.question_text, a.answer_id, a.answer_text, a.is_correct
      FROM question AS q
      LEFT JOIN answer AS a ON q.question_id = a.question_id
      WHERE q.question_id = ?`,
      [questionId]
    )
      .then((results) => {
        const data = results[0];
        
        // Format the result into the desired structure
        let question = null;
        const answers = [];
        
        // Iterate over the rows and extract the question and answers
        data.forEach((row) => {
          if (!question) {
            question = {
              question_id: row.question_id,
              question_text: row.question_text,
              answers: [],
            };
          }
          
          if (row.answer_id) {
            const answer = {
              answer_id: row.answer_id,
              answer_text: row.answer_text,
              is_correct: row.is_correct === 1, // Convert 1 or 0 to boolean
            };
            question.answers.push(answer);
          }
        });
        
        // Send the formatted question and answers as a JSON response
        res.json(question);
      })
      .catch((error) => {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the question and answers.' });
      });
  });
  
    
/*app.get('/questions', (req, res) => {
  // Execute the SQL query to fetch the questions and their answers
  db.execute(
    `SELECT q.question_id, q.question_text, a.answer_id, a.answer_text, a.is_correct
    FROM question AS q
    LEFT JOIN answer AS a ON q.question_id = a.question_id`
  )
    .then((results) => {
      const data = results[0];
      
      // Format the result into the desired structure
      const questions = [];
      
      let currentQuestion = null;
      
      // Iterate over the rows and group answers by question
      data.forEach((row) => {
        if (!currentQuestion || currentQuestion.question_id !== row.question_id) {
          currentQuestion = {
            question_id: row.question_id,
            question_text: row.question_text,
            answers: [],
          };
          questions.push(currentQuestion);
        }
        
        if (row.answer_id) {
          const answer = {
            answer_id: row.answer_id,
            answer_text: row.answer_text,
            is_correct: row.is_correct === 1, // Convert 1 or 0 to boolean
          };
          currentQuestion.answers.push(answer);
        }
      });
      
      // Send the formatted questions as a JSON response
      res.json(questions);
    })
    .catch((error) => {
      // Handle any errors that occur during the database query
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the questions.' });
    });
});*/


app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`on port ${ports}`));