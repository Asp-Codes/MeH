const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    answers: {
        type: [Number],
        required: true,
    },
    score: {
        type: Number,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    stressLevel: {
        type: String,
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Assessment', assessmentSchema);
