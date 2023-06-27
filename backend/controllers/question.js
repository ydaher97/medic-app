const { validationResult } = require('express-validator');

const Questions = require('../models/question');

exports.createQuestion = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return;

    const quiz_id  = req.body.quiz_id;
    const question_text = req.body.question_text;

    try{

        const QuestionDetails = {
            quiz_id :req.body.quiz_id,
            question_text:question_text,
            
        }

        
        const result = await Questions.save(QuestionDetails);

        res.status(201).json({ message: 'Question registered'})
    }catch(err){
        //handle
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}



exports.fitchAll = async (req, res, next) => {
    try{
        const results = await Questions.getQuestions();
        const data = results[0];
        const questions = [];
  
        let currentQuestion = null;
  
        data.forEach((row) => {
          if (!currentQuestion || currentQuestion.question_id !== row.question_id) {
            currentQuestion = {
              question_id: row.question_id,
              quiz_id:row.quiz_id,
              question_text: row.question_text,
              answers: [],
            };
            questions.push(currentQuestion);
          }
  
          if (row.answer_id) {
            const answer = {
              answer_id: row.answer_id,
              answer_text: row.answer_text,
              is_correct: row.is_correct === 1,
            };
            currentQuestion.answers.push(answer);
          }
        });
  
        res.json(questions);
    }catch(err){
        //handle
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}


exports.deletePost = async (req, res, next) => {
    try{
        const deletePost = await Questions.delete(req.params.id);
        res.status(200).json(deletePost);
    }catch(err){
        //handle
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}