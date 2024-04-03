const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const secret = "super30";
const { Admin, User, Course } = require("./model/model.js");
const { connectDB } = require("./model/dbConn.js");
app.use(express.json());
connectDB();

// Admin routes
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;

  // Admin.findOne is one of the asynchronous so , we use async and await
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already Exists" });
  } else {
    // if you got key and value named same you can use any of then only once
    const obj = { username, password };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign(obj, secret, { expiresIn: "1h" });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  // logic to log in admin
  try {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, password }, secret, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin logged in successfully", Token: token });
    } else {
      res.send("admin not found");
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

const adminAuthenticateJwt = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization.split(" ")[1];
    const { username, password } = jwt.verify(authorization, secret);
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      next();
    } else {
      res.status(404).send(`Admin Not found`);
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(500).send({ message: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(500).send({ message: "admin auth failed" });
    }
  }
};
const userAuthenticateJwt = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization.split(" ")[1];
    const { username, password } = jwt.verify(authorization, secret);
    const user = await User.findOne({ username, password });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).send(`User Not found`);
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(500).send({ message: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(500).send({ message: "User auth failed" });
    }
  }
};

// { message: 'Course created successfully', courseId: 1 }
app.post("/admin/courses", adminAuthenticateJwt, (req, res) => {
  // logic to create a course
  const courseObj = req.body;
  const id = Math.floor(Math.random() * 1000);
  courseObj.id = id;
  const newCourse = new Course(courseObj);
  newCourse.save();
  res.json({ message: "Course Created successfully", id });
});

app.put("/admin/courses/:courseId", adminAuthenticateJwt, async (req, res) => {
  // logic to edit a course
  try {
    const updatedCourse = req.body;
    const { courseId } = req.params;
    updatedCourse.id = courseId;
    const id = parseInt(courseId);
    const course = await Course.findOneAndUpdate({ id }, updatedCourse, {
      new: true,
    });
    if (course) {
      res.send({ message: `Course updated`, courseId });
    } else {
      res.send(`course not found`);
    }
  } catch (error) {
    console.log(error);
    res.send(`Error occured`);
  }
});

app.get("/admin/courses", adminAuthenticateJwt, async (req, res) => {
  // logic to get all courses
  try {
    const course = await Course.find({});
    res.send(course);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// User routes started
app.post("/users/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;

  // Admin.findOne is one of the asynchronous so , we use async and await
  const admin = await User.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "User already Exists" });
  } else {
    // if you got key and value named same you can use any of then only once
    const obj = { username, password };
    const newUser = new User(obj);
    newUser.save();
    const token = jwt.sign(obj, secret, { expiresIn: "1h" });
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", async (req, res) => {
  // logic to log in user
  try {
    const { username, password } = req.headers;
    console.log(username, password);
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, password }, secret, {
        expiresIn: "1h",
      });
      res.json({ message: "User logged in successfully", Token: token });
    } else {
      res.send("User not found");
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.get("/users/courses", userAuthenticateJwt, async (req, res) => {
  // logic to list all courses\
  try {
    const course = await Course.find({ published: true });
    console.log(course);

    res.send(course);
  } catch (error) {
    res.send(error);
  }
});

app.post("/users/courses/:courseId", userAuthenticateJwt, async (req, res) => {
  // logic to purchase a course
  try {
    const { courseId } = req.params;
    const { _id } = await Course.findOne({ id: courseId });
    req.user.purchasedCourses.push(_id);
    req.user.save();
    res.send(`course bought successfully`);
  } catch (error) {
    res.send("error");
  }
});

app.get("/users/purchasedCourses", userAuthenticateJwt, async(req, res) => {
  try {
    await req.user.populate("purchasedCourses");
    console.log(req.user.purchasedCourses);
    res.send("get course");
  } catch (error) {
    res.send(error);
  }
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
