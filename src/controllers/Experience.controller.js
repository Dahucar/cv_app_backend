const { request, response } = require("express"); 
const ExperienceSchema = require("../models/resumeItems/Experience.schema");
const msgErrorRequest = 'Internal server error with your request!';

const addExperience = async ( req = request, res = response ) => {
    try {
        const uid = req.uid;
        let expSchema = new ExperienceSchema({ ...req.body, user: uid });
        // Exp saved 
        await expSchema.save();
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

const editExperience = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idExp } = req.params;
        const expParams = req.body;
        let experience = await ExperienceSchema.findById( idExp );
        if ( !experience ) {
            return res.status(400).json({
                ok: false,
                msg: 'That experience dont exist!'
            });
        }
        if( experience.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This experience is not yours!'
            });
        }
        // updated skill params
        await ExperienceSchema.findOneAndUpdate({ _id: idExp }, { ...expParams });
        return res.status(200).json({
            ok: true,
            msg: 'Your experience item is updated successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}

const deletetExperience = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idExp } = req.params;
        let experience = await ExperienceSchema.findById( idExp );
        if ( !experience ) {
            return res.status(400).json({
                ok: false,
                msg: 'That experience dont exist!'
            });
        }
        if( experience.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This experience is not yours!'
            });
        }
        // deleted experience 
        ExperienceSchema.findByIdAndDelete( idExp, ( error ) => {
            if ( error ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Unexpected error in your request!'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    msg: 'Your experience is deleted successfully!'
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

const showExpById = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        const { idExp } = req.params;
        let experience = await ExperienceSchema.findById(idExp);
        if ( !experience ) {
            return res.status(400).json({
                ok: false,
                msg: 'That experience dont exist!'
            });
        }
        if( experience.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This experience is not yours!'
            });
        } 
        return res.status(200).json({
            ok: true,
            experience
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}

const showAllExps = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        let experiences = await ExperienceSchema.find({ user: uid});
        if ( !experiences ) {
            return res.status(400).json({
                ok: false,
                msg: 'You dont have experiences saved!'
            });
        }
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
    addExperience,
    editExperience,
    deletetExperience,
    showExpById,
    showAllExps
}