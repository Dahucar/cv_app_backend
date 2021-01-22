const { Schema, model } = require('mongoose');
const ExperienceSchema = new Schema({
    expTitle: {
        type: String,
        required: true
    },
    expDescriptione: {
        type: String,
        required: true
    },
    expContactjob: {
        type: String,
        require: false,
        default: ''
    },
    expInitDate: {
        type: Date,
        required: true
    },
    expFinishDate: {
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
module.exports = model('Experience', ExperienceSchema);