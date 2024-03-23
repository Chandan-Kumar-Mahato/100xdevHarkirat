const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secret = "super30sec";
function generateToken(obj) {
  const jwtTok = jwt.sign(obj, secret);
  return jwtTok;
}
// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const adminObj = req.body;
  const dupInd = ADMINS.findIndex((val) => val.email === adminObj.email);
  if (dupInd === -1) {
    ADMINS.push(adminObj);
    const mssg = generateToken(adminObj);
    res
      .status(200)
      .json({ message: "Admin created successfully , token: " + mssg });
  } else {
    res.status(301).send({ message: "Admin already Present" });
  }
});

function adminAuthentication(req, res, next) {
  const { email, password } = req.body;
  const adminLoginObj = {
    email,
    password,
  };
  const ind = ADMINS.findIndex(
    (val) => val.email == email && val.password == password
  );
  if (ind == -1) {
    res.status(401).send("Unauthorized Admin");
  } else {
    const jwtTok = generateToken(adminLoginObj);
    req.token = jwtTok;
    req.userName = ADMINS[ind].email;
    next();
  }
}
function jwtAuthenticate(req, res, next) {
  const tok = req.headers.authorization;
  if (tok) {
    var msg = tok.split(" ")[1];
    jwt.verify(msg, secret, (err, mssg) => {
      if (err) {
        res.status(401).send(`Token Auth Failed`);
      } else {
        const checkInd = ADMINS.findIndex(
          (val) => val.email == mssg.email && val.password == mssg.password
        );
        if (checkInd != -1) {
          next();
        }
      }
    });
  } else {
    res.status(401).send(`Admin auth Failed`);
  }
}
function jwtUserAuthenticate(req, res, next) {
  const tok = req.headers.authorization;
  if (tok) {
    var msg = tok.split(" ")[1];
    jwt.verify(msg, secret, (err, mssg) => {
      if (err) {
        res.status(401).send({ message: `Token Auth Failed` });
      } else {
        const checkInd = USERS.findIndex(
          (val) =>
            val.username == mssg.username && val.password == mssg.password
        );
        if (checkInd != -1) {
          // this is the index of the particular user in the user array
          req.userInd = checkInd;
          next();
        }
      }
    });
  } else {
    res.status(401).send(`User auth Failed`);
  }
}
app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin
  res.status(200).json({
    message: "Admin logged in successfully , token: ",
    token: req.token,
    userName: req.userName,
  });
});

app.post("/admin/courses", jwtAuthenticate, (req, res) => {
  // logic to create a course
  const randomId = Math.floor(Math.random() * 100);
  const courseObj = req.body;
  courseObj.id = randomId;
  COURSES.push(courseObj);
  res
    .status(200)
    .send({ message: `Course created successfully courseId: ${randomId}` });
});

// logic to get a particular course
app.get("/admin/courses/:courseId", jwtAuthenticate, (req, res) => {
  const courId = req.params.courseId;
  const courseObj = COURSES.find((val) => val.id == courId);
  res.json(courseObj);
});

app.get("/admin/list", (req, res) => {
  res.json(ADMINS);
});

// this is for editing the particular courseyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmMXNvZnRDYXNiYSIsImF1ZCI6Ik1lcm9TaGFyZSIsImV4cCI6MTcxMTE5MDM4MCwianRpIjoiMDVtYUVsNUp1RGhkUG53M3VDdVRTQSIsImlhdCI6MTcxMTE4ODU4MCwibmJmIjoxNzExMTg4NDYwLCJzdWIiOiJjYXNiYSIsInVzZXJuYW1lIjoiMDM4MDk3MjIiLCJpZCI6NDU1MTY3NiwidG9rZW5DcmVhdGVkIjoiMjAyNC0wMy0yMyAxNTo1NDo0MCIsInByb2ZpbGVOYW1lIjoiTUVST19TSEFSRV9QUk9GSUxFIiwicHJvZmlsZUlkIjoxLCJyb2xlcyI6WyJQdXJjaGFzZSBTb3VyY2UiLCJBcHBsaWNhYmxlIElzc3VlIiwiQXBwbHkiLCJUcmFuc2ZlciBSZXF1ZXN0IFJlcG9ydCIsIkN1cnJlbnQgSXNzdWUiLCJQbGVkZ29yIiwiRWRpdCIsIlRyYW5zZmVyIFNoYXJlcyIsIkFwcGxpY2F0aW9uIFJlcG9ydCIsIk15IEhvbGRpbmdzIiwiUmVhcHBseSIsIk5vIERlbGl2ZXJ5IFRyYWRlcyIsIk9sZCBBcHBsaWNhdGlvbiBSZXBvcnQiLCJNeSBXQUNDIiwiT2xkIFRyYW5zZmVyIFJlcXVlc3QgUmVwb3J0IiwiTXkgRGV0YWlscyIsIk15IFNoYXJlcyIsIk15IFRyYW5zYWN0aW9uIEhpc3RvcnkiLCJNeSBQb3J0Zm9saW8iLCJNeSBQbGVkZ2UgU2hhcmUgRGV0YWlsIiwiTXkgQmFuayBSZXF1ZXN0IiwiTXkgQVNCQSIsIk15IFB1cmNoYXNlIFNvdXJjZSIsIk15IEVESVMiXSwiaXNUZW1wIjpmYWxzZSwiaXNBcHByb3ZhbFJlcXVpcmVkIjp0cnVlfQ.WWbhSsgO9uFzyuupJ_Lk50b2oUvFsvjoIsRcRWEGkokes
app.put("/admin/courses/:courseId", jwtAuthenticate, (req, res) => {
  // logic to edit a course
  const courId = req.params.courseId;
  const courseObj = req.body;
  const courseInd = COURSES.findIndex((val) => val.id == courId);
  console.log(courseInd);
  if (courseInd != -1) {
    courseObj.id = courId;
    Object.assign(COURSES[courseInd], courseObj);
    console.log(COURSES[courseInd]);
    res
      .status(200)
      .send({ message: `course updated successfully with id ${courId}` });
  } else {
    res.status(400).send(`Course Index Not Matched`);
  }
});

app.get("/admin/courses", jwtAuthenticate, (req, res) => {
  // logic to get all courses
  res.json(COURSES);
});

// User routes start here

app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const obj = req.body;
  obj.purchaseCourse = [];
  const findInd = USERS.findIndex(
    (val) => val.username == obj.username && val.password == obj.password
  );
  if (findInd == -1) {
    USERS.push(obj);
    const tok = generateToken(obj);
    res.send({ message: "user Created successfully", token: tok });
  } else {
    res.send(`User already crated by that name!!`);
  }
});

function userAuthentication(req, res, next) {
  const userObj = {
    username: req.headers.username,
    password: req.headers.password,
  };

  const findInd = USERS.findIndex(
    (val) =>
      val.username == userObj.username && val.password == userObj.password
  );
  if (findInd != -1) {
    const tok = generateToken(userObj);
    req.token = tok;
    next();
  } else {
    res.send(`User from that username Not exist`);
  }
}
app.post("/users/login", userAuthentication, (req, res) => {
  // logic to log in user
  res
    .status(200)
    .send({ message: `user loged in successfully `, token: req.token });
});

app.get("/users/list", (req, res) => {
  res.json(USERS);
});
app.get("/users/courses", jwtUserAuthenticate, (req, res) => {
  // logic to list all courses
  const publishedTrueCourses = [];
  COURSES.filter((val) => {
    if (val.published == true) {
      publishedTrueCourses.push(val);
    }
  });
  res.json(publishedTrueCourses);

  // this must list all the course that are published as true
});

app.post("/users/courses/:courseId", jwtUserAuthenticate, (req, res) => {
  // logic to purchase a course
  // my first step should be finding the particular user in the users array
  const courId = req.params.courseId;
  const purCour = COURSES.find((val) => val.id == courId);
  const userind = req.userInd;
  USERS[userind].purchaseCourse.push(purCour);
  res.json({ message: "course purchased successfully" });
  // this will purchase the particular course with the course id
});

app.get("/users/purchasedCourses", jwtUserAuthenticate, (req, res) => {
  // logic to view purchased courses
  const userind = req.userInd;
  res.json(USERS[userind].purchaseCourse);

  // this will list all the courses that are being puchased
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
