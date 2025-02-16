const { Schema, model } = require('mongoose');

const vote = new Schema({
    poll: { type: Schema.Types.ObjectId, ref: 'Poll' },
    option: String,
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

vote.index({ poll: 1, email: 1 }, { unique: true });

module.exports = model('Vote', vote, 'Votes');