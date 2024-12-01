const mongoose = require('mongoose');

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bookmyshow', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to Database');
    } catch (err) {
        console.error('Database Connection Error:', err);
    }
};

module.exports = connectDB;
