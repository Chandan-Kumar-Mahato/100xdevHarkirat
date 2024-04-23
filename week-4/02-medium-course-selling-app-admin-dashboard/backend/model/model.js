const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new Schema({
  username: String,
  password: String,
});

const courseSchema = new Schema({
  name: String,
  price: Number,
  published: Boolean,
  Tutor: String,
  id: { type:Number ,  unique:true},
});
// lets create a mongoose model
const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
  Admin,
  User,
  Course,
};