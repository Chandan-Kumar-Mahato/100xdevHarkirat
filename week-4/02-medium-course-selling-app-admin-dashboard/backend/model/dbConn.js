const MONGO_URL =
  "mongodb+srv://chandan:2211981488@freecodecamp.z5hsd7g.mongodb.net/CSA";
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(MONGO_URL);
    console.log("Mongo Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    connectDB
}
