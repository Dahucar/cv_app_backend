const { Router } = require('express');
const resumeRouter = Router();
const { check } = require('express-validator');
const verifyInputRequest = require('../middlewares/requestValidate');
const { validateJWT } = require('../middlewares/validateJwt');
const { 
    addResume, 
    deleteResume, 
    showResume, 
    showResumes, 
    addEducationOnResume,
    editEducationOnResume,
    deleteEducationOnResume
} = require('../controllers/Resume.controller');

const checkParamsEducation = [
    // title validate
    check('title', 'Your resume title is required!').not().isEmpty(),
    check('title', 'Your resume title length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // college validate
    check('college', 'Your resume college is required!').not().isEmpty(),
    check('college', 'Your resume college length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // title validate
    check('initDate', 'Your resume initDate is required!').not().isEmpty(),
    check('initDate', 'Your resume initDate length must be 4 or 15 characters!').isLength({ min:4, max: 10 }),
    // title validate
    check('finishDate', 'Your resume finishDate is required!').not().isEmpty(),
    check('finishDate', 'Your resume finishDate length must be 4 or 15 characters!').isLength({ min:4, max: 10 }),
    // show error messages
    verifyInputRequest,
    // validate json web token
    validateJWT
];

resumeRouter.post('/add-resume', validateJWT, addResume);
resumeRouter.delete('/delete-resume/:id', validateJWT, deleteResume);
resumeRouter.get('/show-resume/:id', validateJWT, showResume);
resumeRouter.get('/show-resumes', validateJWT, showResumes);

resumeRouter.post('/add-education/:id', checkParamsEducation, addEducationOnResume);
resumeRouter.put('/edit-education/:idResume/:idEducation', checkParamsEducation, editEducationOnResume);
resumeRouter.delete('/delete-education/:idResume/:idEducation', validateJWT, deleteEducationOnResume);

module.exports = resumeRouter;
