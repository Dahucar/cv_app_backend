const { Schema, model } = require('mongoose');
const EducationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    initDate: {
        type: Date,
        required: true
    },
    finishDate: {
        type: Date,
        required: true
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
module.exports = model('Education', EducationSchema);