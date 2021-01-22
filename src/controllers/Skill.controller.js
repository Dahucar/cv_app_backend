const { request, response } = require("express");
const SkillSchema = require("../models/resumeItems/Skill.schema");
const msgErrorRequest = 'Internal server error with your request!';

const addSkill = async ( req = request, res = response ) => {
    try {
        const uid = req.uid;
        let skillModel = new SkillSchema({ ...req.body, user: uid });
        // skill saved 
        await skillModel.save();
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

const editSkill = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idSkill } = req.params;
        const skillParams = req.body;
        let skill = await SkillSchema.findById( idSkill );
        if ( !skill ) {
            return res.status(400).json({
                ok: false,
                msg: 'That skill dont exist!'
            });
        }
        if( skill.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This skill is not yours!'
            });
        }
        // updated skill params
        await SkillSchema.findOneAndUpdate({ _id: idSkill }, { ...skillParams });
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

const deleteSkill = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idSkill } = req.params;
        let skill = await SkillSchema.findById( idSkill );
        if ( !skill ) {
            return res.status(400).json({
                ok: false,
                msg: 'That skill dont exist!'
            });
        }
        if( skill.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This skill is not yours!'
            });
        }
        // deleted skill 
        SkillSchema.findByIdAndDelete( idSkill, ( error ) => {
            if ( error ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Unexpected error in your request!'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    msg: 'Your skill is deleted successfully!'
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

const showSkillById = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idSkill } = req.params;
        let skill = await SkillSchema.findById(idSkill);
        if ( !skill ) {
            return res.status(400).json({
                ok: false,
                msg: 'That skill dont exist!'
            });
        }
        if( skill.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This resume is not yours!'
            });
        } 
        return res.status(200).json({
            ok: true,
            skill
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const showAllSkills = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        let skills = await SkillSchema.find({ user: uid});
        if ( !skills ) {
            return res.status(400).json({
                ok: false,
                msg: 'You dont have skills saved!'
            });
        }
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
    addSkill,
    editSkill,
    deleteSkill,
    showSkillById,
    showAllSkills
}