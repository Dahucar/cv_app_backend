const { Schema, model } = require('mongoose');
const EducationSchema = new Schema({
    educationTitle: {
        type: String,
        required: true
    },
    educationCollege: {
        type: String,
        required: true
    },
    educationInitDate: {
        type: Date,
        required: true
    },
    educationFinishDate: {
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