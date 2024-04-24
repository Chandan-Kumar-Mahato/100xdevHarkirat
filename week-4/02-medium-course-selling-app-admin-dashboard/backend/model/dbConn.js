require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    connectDB
}
