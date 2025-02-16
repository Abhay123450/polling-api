const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log(`Connected to database.`);
        return true;
    } catch (error) {
        console.log(`Failed to connect to database ${error}`);
        return false;
    }

}

module.exports = connectDB;