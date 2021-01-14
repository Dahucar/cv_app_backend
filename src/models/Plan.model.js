const { Schema, model } = require('mongoose');

const PlanSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    initDate: {
        type: Date,
        required: true
    },
    expiredDate: {
        type: Date,
        default: undefined
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Plan', PlanSchema);