const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    try {
        // mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB is not connected, error:",error);
    }

}

module.exports = connectDB