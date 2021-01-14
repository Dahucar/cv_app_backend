const { request, response } = require("express");
const ResumeModel = require("../models/Resume.model");
const msgErrorRequest = 'Internal server error with your request!';

const addEducationOnResume = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const idResume = req.params.id;
        const { title, college, initDate,finishDate } = req.body;
        // verify if exits a resume with the idResume
        let resume = await ResumeModel.findById( idResume );
        if( !resume ){
            return res.status(400).json({
                ok: false,
                msg: 'That resume dont exist!'
            });
        }
        if( resume.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This resume is not yours!'
            });
        }
        const educationItem = { title, college, initDate, finishDate }
        resume.education.push( educationItem );
        await resume.save();
        return res.status(200).json({
            ok: true,
            msg: 'Education saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const editEducationOnResume = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idResume, idEducation } = req.params;
        const commentParams = req.body;
        let resume = await ResumeModel.findById( idResume );
        if ( !resume ) {
            return res.status(400).json({
                ok: false,
                msg: 'That resume dont exist!'
            });
        }
        if( resume.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This resume is not yours!'
            });
        }
        // updated comment params
        await ResumeModel.findOneAndUpdate({ 'education._id': idEducation }, { '$set': { 'education.$': commentParams } }, { new: true });
        return res.status(200).json({
            ok: true,
            msg: 'Your education item is saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const deleteEducationOnResume = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idResume, idEducation } = req.params;
        let resume = await ResumeModel.findById( idResume );
        if ( !resume ) {
            return res.status(400).json({
                ok: false,
                msg: 'That resume dont exist!'
            });
        }
        if( resume.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This resume is not yours!'
            });
        }
        // deleted comment 
        let education = resume.education.id( idEducation );
        if( education ){
            education.remove();
        }
        await resume.save();
        return res.status(200).json({
            ok: true,
            msg: 'Your education item is saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const getAllEducationItems = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idResume } = req.params;
        let resume = await ResumeModel.findById( idResume );
        if ( !resume ) {
            return res.status(400).json({
                ok: false,
                msg: 'That resume dont exist!'
            });
        }
        if( resume.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This resume is not yours!'
            });
        }
        const educations = resume.education;
        return res.status(200).json({
            ok: true,
            educations
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

module.exports = {
    addEducationOnResume,
    editEducationOnResume,
    deleteEducationOnResume,
    getAllEducationItems
}