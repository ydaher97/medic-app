const express = require('express');

const {body} = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authcontroller = require('../controllers/auth');

router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('please enter a valid email')
        .custom(async (email) => {
            const user = await User.find(email);
            if(user[0].length > 0){
                return Promise.reject('email address already exist')
            }
        })
        .normalizeEmail(),
        body('password').trim().isLength({ min: 7}),
    ],authcontroller.signup
);

router.post('/login',authcontroller.login
);

module.exports = router;