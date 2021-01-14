const { request, response } = require("express");
const ResumeModel = require("../models/Resume.model");
const msgErrorRequest = 'Internal server error with your request!';

const addSkillOnResume = async ( req = request, res = response ) => {
    try {
        const uid = req.uid;
        const idResume = req.params.id;
        const { name, experience } = req.body;
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
        // skill saved 
        resume.skills.push( { name, experience } );
        await resume.save();
        return res.status(200).json({
            ok: true,
            msg: 'Skill saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const editSkillOnResume = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idResume, idSkill } = req.params;
        const skillParams = req.body;
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
        await ResumeModel.findOneAndUpdate({ 'skills._id': idSkill }, { '$set': { 'skills.$': skillParams } }, { new: true });
        return res.status(200).json({
            ok: true,
            msg: 'Your skill item is saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const deleteSkillOnResume = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idResume, idSkill } = req.params;
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
        let skill = resume.skills.id( idSkill );
        if( skill ){
            skill.remove();
        }
        await resume.save();
        return res.status(200).json({
            ok: true,
            msg: 'Your skill item is deleted successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const showSkillsOfResume = async ( req = request, res = response ) => {
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
        const skills = resume.skills;
        return res.status(200).json({
            ok: true,
            skills
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
    addSkillOnResume,
    deleteSkillOnResume,
    editSkillOnResume,
    showSkillsOfResume
}