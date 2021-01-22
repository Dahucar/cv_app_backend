const { Router } = require('express');
const resumeRouter = Router();
const { check } = require('express-validator');
const verifyInputRequest = require('../middlewares/requestValidate');
const { validateJWT } = require('../middlewares/validateJwt');
const { 
    addResume, 
    deleteResume, 
    showResume, 
    showResumes
} = require('../controllers/Resume.controller');

const {
    addEducationOnResume,
    editEducationOnResume,
    deleteEducationOnResume,
    getAllEducationItems
} = require('../controllers/Education.controller');

const {
    addSkill,
    editSkill,
    deleteSkill,
    showSkillById,
    showAllSkills
} = require('../controllers/Skill.controller');

const {
    addExpOnResume,
    editExpOnResume,
    deleteExpOnResume,
    showAllExpOfResume
} = require('../controllers/Experience.controller');

const {
    addMoreInfoOnResume,
    editMoreInfoOnResume,
    deleteMoreInfoOnResume,
    showAllMoreInfoOnResume
} = require('../controllers/MoreInfo.controller');

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

const checkParamsSkill = [
    // name validate
    check('skillName', 'Your resume name is required!').not().isEmpty(),
    check('skillExperience', 'Your resume name length must be 4 or 15 characters!').isLength({ min:2, max: 20 }),
    // experience validate
    check('skillName', 'Your resume experience is required!').not().isEmpty(),
    check('skillExperience', 'Your resume experience length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // show error messages
    verifyInputRequest,
    // validate json web token
    validateJWT
];

const checkParamsExp = [
    // title validate
    check('title', 'Your resume title is required!').not().isEmpty(),
    check('title', 'Your resume title length must be 4 or 15 characters!').isLength({ min:2, max: 20 }),
    // description validate
    check('description', 'Your resume description is required!').not().isEmpty(),
    check('description', 'Your resume description length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // contactJob validate
    check('contactJob', 'Your resume contactJob is required!').not().isEmpty(),
    check('contactJob', 'Your resume contactJob length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // initDate validate
    check('initDate', 'Your resume initDate is required!').not().isEmpty(),
    check('initDate', 'Your resume initDate length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // finishDate validate
    check('finishDate', 'Your resume finishDate is required!').not().isEmpty(),
    check('finishDate', 'Your resume finishDate length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // show error messages
    verifyInputRequest,
    // validate json web token
    validateJWT
];

const checkParamsMoreInfo = [
    // titleItem validate
    check('titleItem', 'Your resume titleItem is required!').not().isEmpty(),
    check('titleItem', 'Your resume titleItem length must be 4 or 15 characters!').isLength({ min:2, max: 50 }),
    // titleActivity validate
    check('titleActivity', 'Your resume titleActivity is required!').not().isEmpty(),
    check('titleActivity', 'Your resume titleActivity length must be 4 or 15 characters!').isLength({ min:4, max: 70 }),
    // description validate
    check('description', 'Your resume description is required!').not().isEmpty(),
    check('description', 'Your resume description length must be 4 or 15 characters!').isLength({ min:4, max: 250 }),
    // initDate validate
    check('initDate', 'Your resume initDate is required!').not().isEmpty(),
    check('initDate', 'Your resume initDate length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // finishDate validate
    check('finishDate', 'Your resume finishDate is required!').not().isEmpty(),
    check('finishDate', 'Your resume finishDate length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // show error messages
    verifyInputRequest,
    // validate json web token
    validateJWT
];

resumeRouter.post('/add-resume', [
    // validate title on resume
    check('title', 'Your resume title is required!').not().isEmpty(),
    check('title', 'Your resume title length must be 4 or 15 characters!').isLength({ min:2, max: 50 }),
    // show error messages
    verifyInputRequest,
    // validate json web token
    validateJWT
], addResume);
resumeRouter.delete('/delete-resume/:id', validateJWT, deleteResume);
resumeRouter.get('/show-resume/:id', validateJWT, showResume);
resumeRouter.get('/show-resumes', validateJWT, showResumes);

// Education routes
resumeRouter.post('/add-education/:id', checkParamsEducation, addEducationOnResume);
resumeRouter.put('/edit-education/:idResume/:idEducation', checkParamsEducation, editEducationOnResume);
resumeRouter.delete('/delete-education/:idResume/:idEducation', validateJWT, deleteEducationOnResume);
resumeRouter.get('/show-educations/:idResume', validateJWT, getAllEducationItems);

// Skill routes
resumeRouter.post('/add-skill', checkParamsSkill, addSkill);
resumeRouter.put('/edit-skill/:idSkill', checkParamsSkill, editSkill);
resumeRouter.delete('/delete-skill/:idSkill', validateJWT, deleteSkill);
resumeRouter.get('/show-skill/:idSkill', validateJWT, showSkillById);
resumeRouter.get('/show-all-skills', validateJWT, showAllSkills);

// Exp routes
resumeRouter.post('/add-exp/:id', checkParamsExp, addExpOnResume);
resumeRouter.put('/edit-exp/:idResume/:idExp', checkParamsExp, editExpOnResume);
resumeRouter.delete('/delete-exp/:idResume/:idExp', validateJWT, deleteExpOnResume);
resumeRouter.get('/show-exp/:idResume', validateJWT, showAllExpOfResume);

// More info routes
resumeRouter.post('/add-moreInfo/:id', checkParamsMoreInfo, addMoreInfoOnResume);
resumeRouter.put('/edit-moreInfo/:idResume/:idMore', checkParamsMoreInfo, editMoreInfoOnResume);
resumeRouter.delete('/delete-moreInfo/:idResume/:idMore', validateJWT, deleteMoreInfoOnResume);
resumeRouter.get('/show-moreInfo/:idResume', validateJWT, showAllMoreInfoOnResume);

module.exports = resumeRouter;
