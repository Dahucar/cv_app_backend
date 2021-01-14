const { response, request } = require("express");
const ResumeModel = require("../models/Resume.model");
const msgErrorRequest = 'Internal server error with your request!';
/*
{
    "titleItem": "Certification",
    "titleActivity": "Certificacion on Java SE",
    "description": "Proceso de certificación en JavaSE por parte de Oracle",
    "initDate": "2019-02-05",
    "finishDate": "2019-02-11"
}
*/
const addMoreInfoOnResume = async (req = request, res = response) => {
    try {
        const uid = req.uid;
        const idResume = req.params.id;
        const { titleItem, titleActivity, description, initDate, finishDate } = req.body;
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
        // moreInformation saved 
        resume.moreInformation.push( { titleItem, titleActivity, description, initDate, finishDate } );
        await resume.save();
        return res.status(200).json({
            ok: true,
            msg: 'More information saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}
const editMoreInfoOnResume = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idResume, idMore } = req.params;
        const moreInfoParams = req.body;
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
        await ResumeModel.findOneAndUpdate({ 'moreInformation._id': idMore }, { '$set': { 'moreInformation.$': moreInfoParams } }, { new: true });
        return res.status(200).json({
            ok: true,
            msg: 'Your More information item is saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}
const deleteMoreInfoOnResume = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idResume, idMore } = req.params;
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
        let moreInfo = resume.moreInformation.id( idMore );
        if( moreInfo ){
            moreInfo.remove();
        }
        await resume.save();
        return res.status(200).json({
            ok: true,
            msg: 'Your More information item is deleted successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}
const showAllMoreInfoOnResume = async (req = request, res = response) => {
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
        const moreInformations = resume.moreInformation;
        return res.status(200).json({
            ok: true,
            moreInformations
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
    addMoreInfoOnResume,
    editMoreInfoOnResume,
    deleteMoreInfoOnResume,
    showAllMoreInfoOnResume
}