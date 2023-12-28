const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secret = "super30sec";
function generateToken(obj){
  const jwtTok = jwt.sign(obj,secret);
  return jwtTok;
}
// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const adminObj = req.body;
  const dupInd = ADMINS.findIndex((val)=> val.username===adminObj.username);
  if(dupInd===-1){
    ADMINS.push(adminObj);
    const mssg = generateToken(adminObj);
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
    const jwtTok = generateToken(adminLoginObj);
    req.token = jwtTok;
       next();
  }
}
function jwtAuthenticate(req,res,next){
  const tok = req.headers.authorization;
  if(tok){
    var msg = tok.split(' ')[1];
    jwt.verify(msg,secret,(err,mssg)=>{
      if(err)
      {
        res.status(401).send(`Token Auth Failed`);
      }
      else 
      {
        const checkInd = ADMINS.findIndex((val)=>val.username == mssg.username && val.password == mssg.password);
        if(checkInd != -1){
          next();
        }
      }
    })
  }
  else {
    res.status(401).send(`Admin auth Failed`);
  }
}
app.post('/admin/login', adminAuthentication , (req, res) => {
  // logic to log in admin
  res.status(200).json({message:"Admin logged in successfully , token: ",token:req.token
});
})
app.post('/admin/courses', jwtAuthenticate, (req, res) => {
  // logic to create a course
  const randomId = Math.floor(Math.random()*100);
  const courseObj = req.body;
  courseObj.id = randomId; 
  COURSES.push(courseObj);
  res.send(`Course created successfully`,{courseId:randomId});
});

// this is for editing the particular courses
app.put('/admin/courses/:courseId',jwtAuthenticate, (req, res) => {
  // logic to edit a course
  const courId = req.params.courseId;
  const courseObj = req.body;
  const courseInd = COURSES.findIndex((val)=>val.id==courId);
  if(courseInd !=-1)
  {
    courseObj.id = courId;
    Object.assign(COURSES[courseInd],courseObj);
    res.json(COURSES[courseInd]);
  }
  else {
    res.status(400).send(`Course Index Not Matched`);
  }
});

app.get('/admin/courses', jwtAuthenticate ,  (req, res) => {
  // logic to get all courses
  res.json(COURSES);
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
