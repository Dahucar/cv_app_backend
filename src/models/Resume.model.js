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
    }
}, { versionKey: false });

const SkillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    }
}, { versionKey: false });

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
    }
}, { versionKey: false });

const OtherActivitySchema = new Schema({
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
    }
}, { versionKey: false });

const ResumeSchema = new Schema({
    image:  {
        type: String
    },
    title: {
        type: String
    },
    education: [ EducationSchema ],
    skills: [ SkillSchema ],
    experience: [ ExperienceSchema ],
    moreInformation: [ OtherActivitySchema ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Resume', ResumeSchema);