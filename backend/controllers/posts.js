const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const Posts = require('../models/posts');

exports.postPost = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return;

    const title  = req.body.title;
    const body = req.body.body;
    const user = req.body.user;

    try{

        const PostDetails = {
            title: title,
            body:body,
            user:user
        }

        
        const result = await Posts.save(PostDetails);

        res.status(201).json({ message: 'post registered'})
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
        const [allPosts] = await Posts.fetchAll();
        res.status(200).json(allPosts);
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
        const deletePost = await Posts.delete(req.params.id);
        res.status(200).json(deletePost);
    }catch(err){
        //handle
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}