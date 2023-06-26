const { validationResult } = require('express-validator');

const Score = require('../models/quizUser');

exports.score = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return;

    const user_id  = req.body.user_id;
    const quiz_id = req.body.quiz_id;
    const score = req.body.score;

    try{

        const scoreDetails = {
            user_id: user_id,
            quiz_id:quiz_id,
            score:score
        }

        
        const result = await Score.saveScore(scoreDetails);

        res.status(201).json({ message: 'score registered'})
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

        const [allscore] = await Score.allScore();
        res.status(200).json(allscore);
    }catch(err){
        //handle
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}

