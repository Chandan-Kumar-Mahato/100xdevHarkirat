const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

/* <---> This is the admin part <---> */
// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const obj = {
    username:req.body.username,
    password:req.body.password
  };
  // i traverse array and find the existed user or not
  const ind = ADMINS.findIndex((val)=>obj.username==val.username);
  if(ind === -1)
  {
    ADMINS.push(obj);
    res.send(`Admin Created Successfully`);
  }
  else 
  {
    res.status(404).send("User already created from that name");
  }
});


// this is admin Authentication

const adminAuthentication=(req,res,next)=>{
  const userName = req.headers.username;
  const userPassword = req.headers.password;


  const userInd = ADMINS.findIndex((val)=>(userName ===val.username && userPassword == val.password));
  if(userInd==-1)
  {
    res.status(404).send(`Admin Not Found`);
  }
  else 
  {
       next();
  }
}

// This is for showing the list of admin
app.get('/admin/list',(req,res)=>{
  res.json(ADMINS);
})


// this is the login of the particular admin
app.post('/admin/login', adminAuthentication ,(req, res) => {
  // logic to log in admin
    res.send(`Logged in successfully`);
});



app.post('/admin/courses', adminAuthentication,  (req, res) => {
  // logic to create a course
    const courseObj = req.body;
    courseObj.courseId = Math.floor(Math.random()*100); // this generate the random id
    // COURSES  ---> Here i am checking the course availability with the help of title index
    const titleInd = COURSES.findIndex((val)=>courseObj.title==val.title);
    if(titleInd==-1)
    { 
      COURSES.push(courseObj);
      res.send(`Course created successfully , courseId ${courseObj.courseId} `);
    }
    else{
      res.status(404).send(`Course already been added!`);
    }
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  const courseId = req.params.courseId;
  const findId = COURSES.findIndex((val)=>courseId==val.courseId);
  if(findId==-1)
  {
    res.status(404).send(`That course not found`);

  }
  else
  {
   Object.assign(COURSES[findId],req.body);  //-->this Object.assign does change only where the value is changed
    res.json(`${COURSES[findId]}`);
  }
});

// this will print all the courses 
app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  res.json(COURSES);
});

const userAuthentication = (req,res,next)=>{
  const {username , password} = req.headers;
  const userInd = USERS.find((val)=>username==val.username && password == val.password);
  req.user = userInd;
  if(userInd)
  {
    next();
  }
  else {
    res.status(404).send(`User auth failed`);
  }
}
/* Now you will focus on creating the user and different funcationality  */
// User routes
app.post('/users/signup' ,(req, res) => {
  // logic to sign up user
  const userObj = req.body;
  const findInd = USERS.findIndex((val)=>val.username==userObj.username);
  if(findInd != -1)
  {
    res.status(404).send(`User Auth failed`);
  }
  else 
  {
    userObj.purchaseCourse = [];
    USERS.push(userObj);
    res.send(`User created successfully`);
  }
});

app.post('/users/login', userAuthentication ,  (req, res) => {
  // logic to log in user
  res.send(`User Logged in successfully`);
});

app.get('/users/courses', (req, res) => {
//  here you have to list all the courses that is obly published as "true" 
  var publishedCourse = [];
  publishedCourse = COURSES.filter((val)=>{
    if(val.published === true)
    {
      return val;
    }
  })
  // logic to list all courses
  console.log(publishedCourse);
  res.json(publishedCourse);
});

app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
  // logic to purchase a course
  const requireId = req.params.courseId;
  console.log(requireId);
 const purchase  =  COURSES.find((val)=>val.courseId == requireId);  // here find returns the value not the index
var obj = req.user;
obj["purchaseCourse"].push(purchase);
 res.send(`Course purchased with courseId ${requireId}`);

});

app.get('/users/purchasedCourses',userAuthentication,  (req, res) => {
  // logic to view purchased courses
  var purchaseCourse = req.user;
  res.json(purchaseCourse["purchaseCourse"]);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
