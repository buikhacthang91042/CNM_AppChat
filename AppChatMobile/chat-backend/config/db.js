const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Đã kết nối tới MongoDB');
    } catch (error) {
        console.error("Lỗi kết nối mongoDB", error.message);
        process.exit(1);
    }
  
    
}
module.exports= connectDB;