const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
dotenv.config();

const { pollRouter } = require('./components/poll/poll.router');
const { handleErrors } = require('./utils/handleErrors');

(async function () {

    const isConnected = await connectDB();

    if (!isConnected) {
        process.exit(1);
    }

    const PORT = process.env.PORT || 3000;

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use('/api/v1/', pollRouter);

    app.use(handleErrors);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})();