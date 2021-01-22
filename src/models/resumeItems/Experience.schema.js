const { Schema, model } = require('mongoose');
const ExperienceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contactJob: {
        type: String,
        require: false
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
module.exports = model('Experience', ExperienceSchema);