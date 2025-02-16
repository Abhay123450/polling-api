const { Router } = require('express');
const { addPoll, getAllPolls, getPollById, vote } = require('./poll.controller');
const { catchAsyncError } = require('../../utils/catchAsyncError');
const router = Router();

router.route('/polls')
    .post(catchAsyncError(addPoll))
    .get(catchAsyncError(getAllPolls));

router.route('/polls/:id')
    .get(catchAsyncError(getPollById))
    .put(catchAsyncError(vote));

module.exports.pollRouter = router;

