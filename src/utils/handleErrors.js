function handleErrors(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({ success: false, error: err.message });
}

module.exports = { handleErrors };