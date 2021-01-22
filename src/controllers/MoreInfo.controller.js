const { response, request } = require("express");
const OtherSchema = require("../models/resumeItems/Other.schema");
const msgErrorRequest = 'Internal server error with your request!';

const addMore = async (req = request, res = response) => {
    try {
        const uid = req.uid;
        let otherModel = new OtherSchema({ ...req.body, user: uid });
        // skill saved 
        await otherModel.save();
        return res.status(200).json({
            ok: true,
            msg: 'Other item saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}
const editMore = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idMore } = req.params;
        const otherParams = req.body;
        let other = await OtherSchema.findById( idMore );
        if ( !other ) {
            return res.status(400).json({
                ok: false,
                msg: 'That item dont exist!'
            });
        }
        if( other.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This item is not yours!'
            });
        }
        // updated skill params
        await OtherSchema.findOneAndUpdate({ _id: idMore }, { ...otherParams });
        return res.status(200).json({
            ok: true,
            msg: 'Your other item is saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}
const deleteMore = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idMore } = req.params;
        let other = await OtherSchema.findById( idMore );
        if ( !other ) {
            return res.status(400).json({
                ok: false,
                msg: 'That other item dont exist!'
            });
        }
        if( other.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This other item is not yours!'
            });
        }
        // deleted skill 
        OtherSchema.findByIdAndDelete( idMore, ( error ) => {
            if ( error ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Unexpected error in your request!'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    msg: 'Your other item is deleted successfully!'
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
const showOtherById = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { idMore } = req.params;
        let other = await OtherSchema.findById(idMore);
        if ( !other ) {
            return res.status(400).json({
                ok: false,
                msg: 'That other item dont exist!'
            });
        }
        if( other.user.toString() !== uid ){
            return res.status(400).json({
                ok: false,
                msg: 'This other item is not yours!'
            });
        } 
        return res.status(200).json({
            ok: true,
            other
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest 
        });
    }
}

const showAllOtherItems = async ( req = request, res = response ) => {
    try {
        const { uid } = req;
        let others = await OtherSchema.find({ user: uid});
        if ( !others ) {
            return res.status(400).json({
                ok: false,
                msg: 'You dont have other items saved!'
            });
        }
        return res.status(200).json({
            ok: true,
            others
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
    addMore,
    editMore,
    deleteMore,
    showOtherById,
    showAllOtherItems
}