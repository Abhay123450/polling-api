const Poll = require('./poll.model');
const Vote = require('./vote.model');

async function addPoll(req, res, next) {
    let { question, options } = req.body;

    if (!question) {
        return res.status(400).json({
            success: false,
            message: 'Poll question cannot be empty'
        });
    }

    if (!options) {
        return res.status(400).json({
            success: false,
            message: 'Poll options cannot be empty'
        });
    }

    if (options.length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Poll must have at least 2 options'
        });
    }

    options = options.map(option => {
        return {
            success: false,
            option: option.toString().trim(),
            votes: 0
        }
    });

    console.log(`options: ${JSON.stringify(options)}`);

    const poll = new Poll({
        question,
        options
    });

    const pollSaved = await poll.save();

    if (!pollSaved) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add poll'
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Poll added successfully',
        poll: pollSaved
    });

}

async function getAllPolls(req, res, next) {

    const polls = await Poll.find({}, "question totalVotes");

    if (!polls) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get polls'
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Polls fetched successfully',
        polls
    });
}

async function getPollById(req, res, next) {

    const { id } = req.params;

    const poll = await Poll.findById(id);

    if (!poll) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get poll'
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Poll fetched successfully',
        poll
    });
}

async function vote(req, res, next) {

    const { id } = req.params;
    const { optionId, email } = req.body;

    if (!optionId) {
        return res.status(400).json({
            success: false,
            message: 'Option cannot be empty'
        });
    }

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email cannot be empty'
        });
    }

    const poll = await Poll.findById(id);

    if (!poll) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get poll'
        });
    }

    const newVote = new Vote({
        poll: poll._id,
        email: email
    });

    const voteSaved = await newVote.save();

    if (!voteSaved) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add vote'
        });
    }

    const pollUpdated = await Poll.findByIdAndUpdate(id, {
        $inc: {
            'options.$[elem].votes': 1,
            totalVotes: 1
        }
    },
        {
            arrayFilters: [{ 'elem._id': optionId }],
            new: true
        }
    );

    return res.status(200).json({
        success: true,
        message: 'Vote added successfully',
        poll: pollUpdated
    });
}

module.exports = { addPoll, getAllPolls, getPollById, vote };