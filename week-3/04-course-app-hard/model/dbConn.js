const mongoose = require('mongoose');
const dotenv  = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Connected successfully');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = {connectDB};