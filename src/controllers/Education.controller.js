const { request, response } = require("express");
const EducationSchema = require("../models/resumeItems/Education.schema");
const msgErrorRequest = 'Internal server error with your request!';

const addEducation = async ( req = request, res = response ) => {
    try {
        const uid = req.uid;
        let eduSchema = new EducationSchema({ ...req.body, user: uid });
        // education saved 
        await eduSchema.save();
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

const editEducation = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idEducation } = req.params;
        const educationParams = req.body;
        let education = await EducationSchema.findById( idEducation );
        if ( !education ) {
            return res.status(400).json({
                ok: false,
                msg: 'That education dont exist!'
            });
        }
        if( education.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This education is not yours!'
            });
        }
        // updated skill params
        await EducationSchema.findOneAndUpdate({ _id: idEducation }, { ...educationParams });
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

const deleteEducation = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idEducation } = req.params;
        let education = await EducationSchema.findById( idEducation );
        if ( !education ) {
            return res.status(400).json({
                ok: false,
                msg: 'That education dont exist!'
            });
        }
        if( education.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This education is not yours!'
            });
        }
        // deleted education 
        EducationSchema.findByIdAndDelete( idEducation, ( error ) => {
            if ( error ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Unexpected error in your request!'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    msg: 'Your education is deleted successfully!'
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

const showEducationById = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idEducation } = req.params;
        let education = await EducationSchema.findById(idEducation);
        if ( !education ) {
            return res.status(400).json({
                ok: false,
                msg: 'That education dont exist!'
            });
        }
        if( education.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This education is not yours!'
            });
        } 
        return res.status(200).json({
            ok: true,
            education
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }
}

const showAllEducations = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        let educations = await EducationSchema.find({ user: uid});
        if ( !educations ) {
            return res.status(400).json({
                ok: false,
                msg: 'You dont have educations saved!'
            });
        }
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
    addEducation,
    editEducation,
    deleteEducation,
    showEducationById,
    showAllEducations
}