const { request, response } = require("express");
const ResumeModel = require("../models/Resume.model");
const msgErrorRequest = 'Internal server error with your request!';

const addExpOnResume = async ( req = request, res = response ) => {
    try {
        const uid = req.uid;
        const idResume = req.params.id;
        const { title, description, contactJob, initDate, finishDate } = req.body;
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
        // Exp saved 
        resume.experience.push( { title, description, contactJob, initDate, finishDate } );
        await resume.save();
        return res.status(200).json({
            ok: true,
            msg: 'Experience saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}

const editExpOnResume = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idResume, idExp } = req.params;
        const expParams = req.body;
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
        // updated skill params
        await ResumeModel.findOneAndUpdate({ 'experience._id': idExp }, { '$set': { 'experience.$': expParams } }, { new: true });
        return res.status(200).json({
            ok: true,
            msg: 'Your experience item is saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}

const deleteExpOnResume = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idResume, idExp } = req.params;
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
        // deleted skill 
        let experience = resume.experience.id( idExp );
        if( experience ){
            experience.remove();
        }
        await resume.save();
        return res.status(200).json({
            ok: true,
            msg: 'Your experience item is deleted successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}

const showAllExpOfResume = async ( req = request, res = response ) => {
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
        const experiences = resume.experience;
        return res.status(200).json({
            ok: true,
            experiences
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
    addExpOnResume,
    editExpOnResume,
    deleteExpOnResume,
    showAllExpOfResume
}