const { Schema, model } = require('mongoose');
const SkillSchema = new Schema({
    skillName: {
        type: String,
        required: true
    },
    skillExperience: {
        type: String,
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
module.exports = model('Skill', SkillSchema);