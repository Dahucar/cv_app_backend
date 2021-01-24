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
    addEducation,
    editEducation,
    deleteEducation,
    showEducationById,
    showAllEducations
} = require('../controllers/Education.controller');

const {
    addSkill,
    editSkill,
    deleteSkill,
    showSkillById,
    showAllSkills
} = require('../controllers/Skill.controller');

const {
    addExperience,
    editExperience,
    deletetExperience,
    showExpById,
    showAllExps
} = require('../controllers/Experience.controller');

const {
    addMore,
    editMore,
    deleteMore,
    showOtherById,
    showAllOtherItems
} = require('../controllers/MoreInfo.controller');

const checkParamsEducation = [
    // title validate
    check('educationTitle', 'Your resume title is required!').not().isEmpty(),
    check('educationTitle', 'Your resume title length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // college validate
    check('educationCollege', 'Your resume college is required!').not().isEmpty(),
    check('educationCollege', 'Your resume college length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // title validate
    check('educationInitDate', 'Your resume ini tDate is required!').not().isEmpty(),
    check('educationInitDate', 'Your resume ini Date length must be 4 or 15 characters!').isLength({ min:4, max: 10 }),
    // title validate
    check('educationFinishDate', 'Your resume finish Date is required!').not().isEmpty(),
    check('educationFinishDate', 'Your resume finish Date length must be 4 or 15 characters!').isLength({ min:4, max: 10 }),
    // show error messages
    verifyInputRequest,
    // validate json web token
    validateJWT
];

const checkParamsSkill = [
    // name validate
    check('skillName', 'Your skill name is required!').not().isEmpty(),
    check('skillName', 'Your skill name length must be 2 or 20 characters!').isLength({ min:2, max: 20 }),
    // experience validate
    check('skillExperience', 'Your skill experience is required!').not().isEmpty(),
    check('skillExperience', 'Your skill experience length must be 4 or 30 characters!').isLength({ min:4, max: 30 }),
    // show error messages
    verifyInputRequest,
    // validate json web token
    validateJWT
];

const checkParamsExp = [
    // title validate
    check('expTitle', 'Your resume title is required!').not().isEmpty(),
    check('expTitle', 'Your resume title length must be 4 or 15 characters!').isLength({ min:2, max: 30 }),
    // description validate
    check('expDescriptione', 'Your resume description is required!').not().isEmpty(),
    check('expDescriptione', 'Your resume description length must be 4 or 15 characters!').isLength({ min:4, max: 150 }),
    // contactJob validate
    check('expContactjob', 'Your resume contact Job is required!').not().isEmpty(),
    check('expContactjob', 'Your resume contact Job length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // initDate validate
    check('expInitDate', 'Your resume init Date is required!').not().isEmpty(),
    check('expInitDate', 'Your resume init Date length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // finishDate validate
    check('expFinishDate', 'Your resume finish Date is required!').not().isEmpty(),
    check('expFinishDate', 'Your resume finish Date length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // show error messages
    verifyInputRequest,
    // validate json web token
    validateJWT
];

const checkParamsMoreInfo = [
    // titleItem validate
    check('otherTitle', 'Your resume title Item is required!').not().isEmpty(),
    check('otherTitle', 'Your resume title Item length must be 4 or 15 characters!').isLength({ min:2, max: 50 }),
    // titleActivity validate
    check('otherTitleAct', 'Your resume title Activity is required!').not().isEmpty(),
    check('otherTitleAct', 'Your resume title Activity length must be 4 or 15 characters!').isLength({ min:4, max: 70 }),
    // description validate
    check('otherDescrip', 'Your resume description is required!').not().isEmpty(),
    check('otherDescrip', 'Your resume description length must be 4 or 15 characters!').isLength({ min:4, max: 250 }),
    // initDate validate
    check('otherInitDate', 'Your resume init Date is required!').not().isEmpty(),
    check('otherInitDate', 'Your resume init Date length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
    // finishDate validate
    check('otherFinishDate', 'Your resume finish Date is required!').not().isEmpty(),
    check('otherFinishDate', 'Your resume finish Date length must be 4 or 15 characters!').isLength({ min:4, max: 30 }),
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
resumeRouter.post('/add-education', checkParamsEducation, addEducation);
resumeRouter.put('/edit-education/:idEducation', checkParamsEducation, editEducation);
resumeRouter.delete('/delete-education/:idEducation', validateJWT, deleteEducation);
resumeRouter.get('/show-education/:idEducation', validateJWT, showEducationById);
resumeRouter.get('/show-all-educs', validateJWT, showAllEducations);

// Skill routes
resumeRouter.post('/add-skill', checkParamsSkill, addSkill);
resumeRouter.put('/edit-skill/:idSkill', checkParamsSkill, editSkill);
resumeRouter.delete('/delete-skill/:idSkill', validateJWT, deleteSkill);
resumeRouter.get('/show-skill/:idSkill', validateJWT, showSkillById);
resumeRouter.get('/show-all-skills', validateJWT, showAllSkills);

// Exp routes
resumeRouter.post('/add-exp', checkParamsExp, addExperience);
resumeRouter.put('/edit-exp/:idExp', checkParamsExp, editExperience);
resumeRouter.delete('/delete-exp/:idExp', validateJWT, deletetExperience);
resumeRouter.get('/show-exp/:idExp', validateJWT, showExpById);
resumeRouter.get('/show-all-exps', validateJWT, showAllExps);

// More info routes
resumeRouter.post('/add-moreInfo', checkParamsMoreInfo, addMore);
resumeRouter.put('/edit-moreInfo/:idMore', checkParamsMoreInfo, editMore);
resumeRouter.delete('/delete-moreInfo/:idMore', validateJWT, deleteMore);
resumeRouter.get('/show-other/:idMore', validateJWT, showOtherById);
resumeRouter.get('/show-all-others', validateJWT, showAllOtherItems);

module.exports = resumeRouter;
