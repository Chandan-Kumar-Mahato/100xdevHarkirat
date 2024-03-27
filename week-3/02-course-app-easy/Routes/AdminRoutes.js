const express = require("express");
const router = express.Router();
const adminAuthentication = require("../middlewares/adminAuthentication");

let ADMINS = [];
let COURSES = [];
router.post("/signup", (req, res) => {
  const obj = {
    username: req.body.username,
    password: req.body.password,
  };
  // i traverse array and find the existed user or not
  const ind = ADMINS.findIndex((val) => obj.username == val.username);
  if (ind === -1) {
    ADMINS.push(obj);
    res.send(`Admin Created Successfully`);
  } else {
    res.status(404).send("User already created from that name");
  }
});

router.get("/list", (req, res) => {
  res.send(ADMINS);
});

router.get("/", (req, res) => {
    console.log(ADMINS);
  res.send(`This is the first time that i have used the router`);
});

router.post("/login", adminAuthentication, (req, res) => {
  res.send(`Logged in successfully`);
});

router.post("/courses", adminAuthentication, (req, res) => {
  const courseObj = req.body;
  courseObj.courseId = Math.floor(Math.random() * 100); // this generate the random id
  // COURSES  ---> Here i am checking the course availability with the help of title index
  console.log(COURSES);
  const titleInd = COURSES.findIndex((val) => courseObj.name == val.name);
  console.log(titleInd);
  if (titleInd == -1) {
    COURSES.push(courseObj);
    res.send(`Course created successfully , courseId ${courseObj.courseId} `);
  } else {
    res.status(404).send(`Course already been added!`);
  }
});

router.put("/courses/:courseId", adminAuthentication, (req, res) => {
  const courseId = req.params.courseId;
  const findInd = COURSES.findIndex((val) => courseId == val.courseId);
  if (findInd == -1) {
    res.status(404).send(`That course not found`);
  } else {
    Object.assign(COURSES[findInd], req.body); //-->this Object.assign does change only where the value is changed
    console.log(COURSES[findInd]);
    res.send({ course: COURSES[findInd] });
  }
});

router.get('/courses',adminAuthentication,(req,res)=>{
    res.send(COURSES);
})

module.exports = router;
