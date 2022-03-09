const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = () => {
    try {
        mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection is established!');
    } catch (error) {
        console.log('Error while connecting database: ', error);
        throw error;
    }
}

module.exports = connectDatabase;