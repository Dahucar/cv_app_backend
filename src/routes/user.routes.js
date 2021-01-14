const { Router } = require('express');
const { check } = require('express-validator');
const userRouter = Router();
const verifyInputRequest = require('../middlewares/requestValidate');

// actions for routes 
const { addUser, editUser, login, renewToken } = require('../controllers/Users.controller');
const { validateJWT } = require('../middlewares/validateJwt');

// TODO: verify how to protect routes or schemas of XSS attacks
userRouter.post('/add-user', [
    // nick validate
    check('nick', 'Your nick is required!').not().isEmpty(),
    check('nick', 'Your nick length must be 4 or 15 characters!').isLength({ min:4, max: 15 }),
    // name validate
    check('name', 'Your name is required!').not().isEmpty(),
    check('name', 'Your name length must be 4 or 15 characters!').isLength({ min:4, max: 15 }),
    // surname validate
    check('surname', 'Your surname is required!').not().isEmpty(),
    check('surname', 'Your surname length must be 4 or 15 characters!').isLength({ min:4, max: 15 }),
    // email validate
    check('email', 'Your email is required!').not().isEmpty(),
    check('email', 'Your email length must be 5 or 30 characters!').isLength({ min:5, max: 30 }),
    check('email', 'Your email must be have a correct format').isEmail(),
    // password validate
    check('password', 'Your password is required!').not().isEmpty(),
    check('password', 'Your password length must be 4 or 8 characters!').isLength({ min:4, max: 8 }),
    // show error messages
    verifyInputRequest
], addUser);

userRouter.post('/login', [
    // email validate
    check('email', 'Your email is required!').not().isEmpty(),
    check('email', 'Your email length must be 5 or 30 characters!').isLength({ min:5, max: 30 }),
    check('email', 'Your email must be have a correct format').isEmail(),
    // password validate
    check('password', 'Your password is required!').not().isEmpty(),
    check('password', 'Your password length must be 4 or 8 characters!').isLength({ min:4, max: 8 }),
    // show error messages
    verifyInputRequest
], login);

userRouter.put('/edit-user', [
    // name validate
    check('name', 'Your name is required!').not().isEmpty(),
    check('name', 'Your name length must be 4 or 15 characters!').isLength({ min:4, max: 15 }),
    // surname validate
    check('surname', 'Your surname is required!').not().isEmpty(),
    check('surname', 'Your surname length must be 4 or 15 characters!').isLength({ min:4, max: 15 }),
    // surname validate
    check('surname', 'Your surname is required!').not().isEmpty(),
    check('surname', 'Your surname length must be 4 or 15 characters!').isLength({ min:4, max: 15 }),
    // show error messages
    verifyInputRequest,
    // validate json web token
    validateJWT
], editUser);

userRouter.get('/renew-token', validateJWT, renewToken);

module.exports = userRouter;