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

  // Admin.findOne is one of the asynchronous so , we use async and await
  const admin = await Admin.findOne({username});
  if(admin){
    res.status(403).json({message:"Admin already Exists"});
  }
  else 
  {
    // if you got key and value named same you can use any of then only once
  const obj  = {username , password};
  const newAdmin = new Admin(obj);
  newAdmin.save();
  const token = jwt.sign(obj , secret , {expiresIn:'1h'});
    res.json({message:"Admin created successfully" , token});
}
  
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const {username , password} = req.headers;
  const admin = Admin.findOne({username , password});
  if(admin)
  {
    const token = jwt.sign({username , password} , secret , {expiresIn:"1h"});
    res.json({message:"Admin logged in successfully" , Token:token});
  }
  else 
  res.status(403).json({message:"Invalid username or password"});

});
function authenticateJwt(req,res,next)
{
  var  auth = req.headers.authorization;
   auth = auth.split(' ')[1];
   console.log(auth);
   jwt.verify(auth,secret,(err,data)=>{
   console.log(data);
   next();
   })
}
app.post('/admin/courses', authenticateJwt ,  (req, res) => {
  // logic to create a course
  res.send('Called Successfully');
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
