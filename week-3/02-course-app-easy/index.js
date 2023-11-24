const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const obj = {
    user:req.body.username,
    pass:req.body.pass
  };
  // i traverse array and find the existed user or not
  const ind = ADMINS.findIndex((val)=>obj.user==val.user);
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

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const userName = req.headers.username;
  const userPassword = req.headers.passwd;
  const userInd = ADMINS.findIndex((val)=>userName==val.user);
  if(userInd==-1)
  {
    res.status(404).send(`Admin Not Found`);
  }
  else if(ADMINS[userInd].pass != userPassword)
  {
    res.status(404).send(`Admin Password is wrong`);
  }
  else 
  {
    res.send(`Logged in successfully`);
  }

});

app.post('/admin/courses', (req, res) => {
  // logic to create a course

  const userName = req.headers.username;
  const userInd = ADMINS.findIndex((val)=>userName==val.user);
  if(userInd==-1)
  {
    res.status(404).send(`Admin Not found`);
  }else
  {
    const courseObj = {
      title:req.body.title,
      description:req.body.description,
      price: req.body.price,
      published:req.body.published,
      id:Math.floor(Math.random()*100),
      imageLink: req.body.imageLink
    }
    // COURSES  --> this is my courses array
    const titleInd = COURSES.findIndex((val)=>courseObj.title==val.title);
    if(titleInd==-1)
    {
      COURSES.push(courseObj);
      res.send(`Course created successfully , courseId ${courseObj.id} `);
    }
    else{
      res.status(404).send(`Course already been added!`);
    }
  }
  
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  const courseId = req.params.courseId;
  const findId = COURSES.findIndex((val)=>courseId==val.id);
  if(findId==-1)
  {
    res.status(404).send(`That course not found`);

  }
  
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
