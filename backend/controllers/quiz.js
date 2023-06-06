const { validationResult } = require('express-validator');

const Quizzes = require('../models/quiz');

exports.makeQuiz = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return;

    const title  = req.body.title;
    const description = req.body.description;
    const duration = req.body.duration;
    const cat_id = req.body.category_id

    try{

        const quizDetails = {
            title: title,
            description:description,
            duration:duration,
            cat_id:cat_id
        }

        
        const result = await Quizzes.save(quizDetails);

        res.status(201).json({ message: 'quiz registered'})
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
        const [allquizs] = await Quizzes.fetchAll();
        res.status(200).json(allquizs);
    }catch(err){
        //handle
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}


exports.deletequiz = async (req, res, next) => {
    try{
        const deletequiz = await Quizzes.delete(req.params.id);
        res.status(200).json(deletequiz);
    }catch(err){
        //handle
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}