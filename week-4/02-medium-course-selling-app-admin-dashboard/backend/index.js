const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require('multer');

const storage = multer.diskStorage({
  destination:function(req,file, cb){
    cb(null , '/uploads')
  },
  filename:function(req,file, cb){
    cb(null , `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({storage:storage});
const cors = require("cors");

const { connectDB } = require("./model/dbConn");
const { Admin, User, Course } = require("./model/model");



connectDB();
app.use(cors());

app.use(express.json());

const secret = "super30sec";

function generateToken(obj) {
  const jwtTok = jwt.sign(obj, secret);
  return jwtTok;
}

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const adminObj = req.body;
  Admin.findOne({ username: adminObj.username })
    .then((admin) => {
      if (admin) res.send(`admin already present`);
      else {
        Admin.create(adminObj)
          .then((admin) => {
            console.log(admin);
            const mssg = generateToken(adminObj);
            res
              .status(200)
              .json({ message: "Admin created successfully , token: " + mssg });
          })
          .catch((err) => {
            res.send(`admin not created`);
          });
      }
    })
    .catch((err) => {
      res.send(`admin not created`);
    });
});

function adminAuthentication(req, res, next) {
  const { username, password } = req.body;
  const adminLoginObj = { username, password };
  Admin.findOne({ username, password })
    .then((admin) => {
      if (admin) {
        const jwtTok = generateToken(adminLoginObj);
        req.token = jwtTok;
        req.userName = username;
        next();
      } else {
        res.status(401).send("Unauthorized Admin");
      }
    })
    .catch((err) => res.send(err));
}

function jwtAuthenticate(req, res, next) {
  const tok = req.headers.authorization;
  if (tok) {
    var msg = tok.split(" ")[1];
    jwt.verify(msg, secret, (err, mssg) => {
      if (err) {
        res.status(401).send(`Token Auth Failed`);
      } else {
        Admin.findOne({ username: mssg.username, password: mssg.password })
          .then((admin) => {
            if (admin) {
              next();
            } else {
              res.status(401).send(`Admin auth Failed`);
            }
          })
          .catch((err) => {
            res.send("error occured in databse");
          });
      }
    });
  } else res.send("token auth failed");
}

function jwtUserAuthenticate(req, res, next) {
  const tok = req.headers.authorization;
  if (tok) {
    var msg = tok.split(" ")[1];
    jwt.verify(msg, secret, (err, mssg) => {
      if (err) {
        res.status(401).send({ message: `Token Auth Failed` });
      } else {
        User.findOne({ username: mssg.username, password: mssg.password })
          .then((user) => {
            if (user) {
              req.user = mssg.username;
              next();
            } else {
              res.send("User Not found");
            }
          })
          .catch((err) => {
            res.send(err);
          });
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
  console.log(courseObj);
  courseObj.id = randomId;
  Course.create(courseObj)
    .then((course) => {
      console.log(course);
      res
        .status(200)
        .send({ message: `Course created successfully courseId: ${randomId}` });
    })
    .catch((err) => {
      res.send("Course creation failed");
    });
});

// logic to get a particular course
app.get("/admin/courses/:courseId", jwtAuthenticate, (req, res) => {
  const courId = req.params.courseId;
  Course.findOne({ id: courId }).then((course) => {
    if (course) {
      res.send(course);
    } else res.status(404).send("course Not Found");
  });
});

app.get("/admin/list", (req, res) => {
  Admin.find({}).then((admin) => {
    if (admin) {
      res.send(admin);
    } else {
      res.send("Admin not present");
    }
  });
});

app.put("/admin/courses/:courseId", jwtAuthenticate, (req, res) => {
  // logic to edit a course
  const courId = req.params.courseId;
  const courseObj = req.body;
  Course.findOne({ id: courId }).then((course) => {
    console.log(course);
    Object.assign(course, courseObj);
    course
      .save()
      .then((course) => {
        res
          .status(200)
          .send({ message: `course updated successfully with id ${courId}` });
      })
      .catch((err) => {
        res.status(404).send("course updation failed");
      });
  });
});

app.get("/admin/courses", jwtAuthenticate, (req, res) => {
  // logic to get all courses
  Course.find({}).then((course) => {
    if (course) res.send(course);
    else res.status(404).send("Course Not present");
  });
});

// User routes start here

app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const obj = req.body;
  console.log(obj);
  User.findOne({ username: obj.username, password: obj.password }).then(
    (user) => {
      if (user) res.send("user already present");
      else {
        User.create(obj).then((user) => {
          if (user) {
            const tok = generateToken(obj);
            res.send({ message: "user Created successfully", token: tok });
          } else res.send(`Error while creating the user`);
        });
      }
    }
  );
});

function userAuthentication(req, res, next) {
  const { username, password } = req.headers;
  User.findOne({ username, password }).then((user) => {
    if (user) {
      const tok = generateToken({ username, password });
      req.token = tok;
      next();
    } else {
      res.send(`User from that username Not exist`);
    }
  });
}

app.post("/users/login", userAuthentication, (req, res) => {
  // logic to log in user
  res
    .status(200)
    .send({ message: `user loged in successfully `, token: req.token });
});

// logic to list all user
app.get("/users/list", (req, res) => {
  User.find({})
    .then((user) => {
      if (user) res.send(user);
      else res.send("please create a user!!");
    })
    .catch((err) => {
      res.send(err);
    });
});
// this must list all the course that are published as true
app.get("/users/courses", jwtUserAuthenticate, (req, res) => {
  Course.find({ published: true })
    .then((course) => {
      if (course) {
        res.send(course);
      } else {
        res.send(`You dont have any course to buy Yet`);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

// logic to purchase a course
// this will purchase the particular course with the course id
app.post("/users/courses/:courseId", jwtUserAuthenticate, (req, res) => {
  // my first step should be finding the particular user in the users array
  const { courseId } = req.params;
  User.findOne({ username: req.user }).then((user) => {
    if (user) {
      Course.findOne({ id: courseId })
        .then((course) => {
          if (course) {
            user.purchasedCourses.push(course._id);
            user
              .save()
              .then(() =>
                res.json({ message: "course purchased successfully" })
              )
              .catch((err) => res.send(err));
          }
        })
        .catch((err) => res.send(err));
    }
  });
});

// logic to view purchased courses
// this will list all the courses that are being puchased
app.get("/users/purchasedCourses", jwtUserAuthenticate, (req, res) => {
  User.findOne({ username: req.user })
    .populate("purchasedCourses")
    .then((user) => {
      if (user) {
        res.send(user.purchasedCourses);
      } else {
        res.send("user Not found");
      }
    })
    .catch((err) => res.send(err));
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
