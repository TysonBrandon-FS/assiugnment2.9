const mongoose = require('mongoose');


const connectDB = async () => {
    const URI = process.env.MONGODB_URI;
    console.log(URI + " URI");
    try {
         const conn = await mongoose.connect(URI || 'mongodb://localhost:27017/tvshows');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB; 