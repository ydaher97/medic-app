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
        const [allQuestions] = await Questions.fetchAll();
        res.status(200).json(allQuestions);
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