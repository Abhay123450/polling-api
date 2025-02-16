const { Schema, model, Types } = require('mongoose');

const pollSchema = new Schema({
    question: String,
    options: [
        {
            option: String,
            votes: Number
        }
    ],
    totalVotes: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

module.exports = model('Poll', pollSchema, 'Polls');