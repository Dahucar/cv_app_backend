const { Schema, model } = require('mongoose');
const OtherSchema = new Schema({
    otherTitle: {
        type: String,
        required: true
    },
    otherTitleAct: {
        type: String,
        required: true
    },
    otherDescrip: {
        type: String,
        required: false,
        default: ''
    },
    otherInitDate: {
        type: Date,
        required: false,
        default: ''
    },
    otherFinishDate: {
        type: Date,
        required: false,
        default: ''
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = model('Other', OtherSchema);