const express = require('express');

const {body} = require('express-validator');

const router = express.Router();
const auth = require('../middleware/auth');
const Postscontroller = require('../controllers/posts');


router.get('/',auth, Postscontroller.fitchAll)

router.post('/',[
    auth,
    body('title').trim().isLength({min: 5}).not().isEmpty(),
    body('body').trim().isLength({min: 10}).not().isEmpty(),
    body('user').trim().not().isEmpty() 
],Postscontroller.postPost);

router.delete('/:id',auth,Postscontroller.deletePost)

module.exports = router;