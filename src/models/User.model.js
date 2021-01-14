const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    nick: {
        type: String,
        required: true,
        unique: true 
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('User', UserSchema);