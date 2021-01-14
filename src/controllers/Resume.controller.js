const { request, response } = require("express");
const ResumeModel = require("../models/Resume.model");
const msgErrorRequest = 'Internal server error with your request!';

/*
{
    "image": ""
    "title": ""
    "education": [
        {
            "title": "Analista Programador" ,
            "college": "CFT Inacap" ,
            "initDate": "2018-03-05" ,
            "finishDate": "2020-06-11" 
        }
    ]
    "skills": [
        {
            "name": "JavaScript" ,
            "experience": "Advances" ,
        },
        {
            "name": "NodeJS" ,
            "experience": "Intermedie" 
        }
    ]
    "experience": [
        {
            "title": "Desarrollador Freelance",
            "description": "Desarrollo de app de contabilidad usando Nodejs/Express y ReactJS",
            "contactJob": "+569 25346895",
            "initDate": "2019-02-05",
            "finishDate": "2019-02-11"
        }
    ]
    "moreInformation": [
        {
            "titleItem": "Certification",
            "titleActivity": "Certificacion on Java SE",
            "description": "Proceso de certificación en JavaSE por parte de Oracle",
            "initDate": "2019-02-05",
            "finishDate": "2019-02-11"
        }
    ]
}
*/

const addResume = async ( req = request, res = response ) => {
    try {
        // uid of middleware validation
        const { uid } = req;
        // array of educations object
        let resume = new ResumeModel();
        resume.user = uid;
        await resume.save();

        return res.status(201).json({
            ok: true,
            msg: 'Your resume is saved successfully!',
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const deleteResume = async ( req = request, res = response ) => {
    try {
        // uid of middleware validation
        const { uid } = req;
        const id = req.params.id;
        let resume = await ResumeModel.findById( id );
        if ( !resume ) {
            return res.status(400).json({
                ok: true,
                msg: 'That resume dont exist!'
            });
        }
        if ( resume.user.toString() !== uid ){
            return res.status(400).json({
                ok: true,
                msg: 'this resume is not yours'
            });
        }
        ResumeModel.findByIdAndDelete( id, ( error ) => {
            if ( error ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Unexpected error in your request!'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    msg: 'Your resume is deleted successfully!'
                });
            } 
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const showResume = async ( req = request, res = response ) => {
    try {
        // uid of middleware validation
        const { uid } = req;
        const id = req.params.id;
        let resume = await ResumeModel.findById( id );
        if ( !resume ) {
            return res.status(500).json({
                ok: true,
                msg: 'That resume dont exist!'
            });
        }
        if ( resume.user.toString() !== uid ){
            return res.status(500).json({
                ok: true,
                msg: 'this resume is not yours'
            });
        }
        return res.status(200).json({
            ok: true,
            resume
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const showResumes = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const resumes = await ResumeModel.find({ user: uid });
        return res.status(200).json({
            ok: true,
            uid,
            resumes
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const updateImageOnResume= ( req = request, res = response ) => {
    try {
        
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

module.exports = {
    addResume,
    deleteResume,
    showResume,
    showResumes,
    updateImageOnResume,
}