const mongoose = require('mongoose');

const connectDatabase = async() => {
    try{
        const data = await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected:",data.connection.host);

    } catch (error){
        console.log("MongoDB connection failed");
        console.error(error.message);

    }
}

module.exports = connectDatabase;