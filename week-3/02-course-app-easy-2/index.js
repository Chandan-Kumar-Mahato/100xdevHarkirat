const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const adminObj = req.body;
  const dupInd = ADMINS.findIndex((val)=> val.username===adminObj.username);
  if(dupInd===-1){
    ADMINS.push(adminObj);
    const secret = "super30sec"
    const mssg = jwt.sign(adminObj,secret);
    res.status(200).json({message:"Admin created successfully , token: " + mssg});
  }
});

function adminAuthentication(req,res,next){
  const adminLoginObj ={
    username:req.headers.username,
    password:req.headers.password
  };
  const ind = ADMINS.findIndex((val)=>val.username==adminLoginObj.username && val.password==adminLoginObj.password);
  if(ind==-1){
    res.status(401).send("Unauthorized Admin");
  }
  else{
    const secret = "super30sec";
    const jwtTok = jwt.sign(adminLoginObj,secret);
    req.token = jwtTok;
       next();
  }
}
app.post('/admin/login', adminAuthentication , (req, res) => {
  // logic to log in admin
  res.status(200).json({message:"Admin logged in successfully , token: ",token:req.token
});
})
app.post('/admin/courses', (req, res) => {
  // logic to create a course
  const randomId = Math.floor(Math.random()*100);
  const courseObj = req.body;
  courseObj.id = randomId; 
  COURSES.push(courseObj);
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
