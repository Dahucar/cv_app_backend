const { Schema, model } = require('mongoose');
const OtherSchema = new Schema({
    titleItem: {
        type: String,
        required: true
    },
    titleActivity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: undefined
    },
    initDate: {
        type: Date,
        required: false,
        default: undefined
    },
    finishDate: {
        type: Date,
        required: false,
        default: undefined
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