const mongoose = require('mongoose');

const connectDb  = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB Connected");
    }catch(error){  
        console.log(error);
        process.exit(1);
    }
}

module.exports = {connectDb}; 