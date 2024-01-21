const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const secret = 'super30';
app.use(express.json());
// lets create a schema 
const userSchema = new mongoose.Schema({
  username:{type:String},
  password:String,
  purchasedCourses:[{type:mongoose.Schema.Types.ObjectId , ref:'Course'}]
});

const adminSchema = new mongoose.Schema({
  username:String , 
  password:String
})

const courseSchema = new mongoose.Schema({
  title:String,
  description:String,
  price:Number,
  published:Boolean
})
// lets create a mongoose module
const Admin = mongoose.model('Admin', adminSchema);
const  User = mongoose.model('User' , userSchema);
const Course = mongoose.model('Course' , courseSchema);

// lets connect backend with database

mongoose.connect('mongodb+srv://chandu:9807774772@temprorary.scortpu.mongodb.net/');


// Admin routes
app.post('/admin/signup', async(req, res) => {
  // logic to sign up admin
  const {username , password} = req.body;
  const admin = await Admin.findOne({username});
  if(admin){
    res.status(403).json({message:"Admin already Exists"});
  }
  else 
  {
  const obj  = {username , password};
  const newAdmin = new Admin(obj);
  newAdmin.save();
  const token = jwt.sign(obj , secret , {expiresIn:'1h'});
    res.json({message:"Admin created successfully" , token});
}
  
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
