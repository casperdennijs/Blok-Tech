const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection is established!');
    } catch (err) {
        console.log('Error while connecting database: ', err);
        throw err;
    }
}

module.exports = connectDB;