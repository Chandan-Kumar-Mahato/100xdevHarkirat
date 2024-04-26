import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import CreateCourse from "./components/CreateCourse";
import Register from "./components/Register";
import ShowCourses from "./components/ShowCourses";
import Header from "./components/Header";
import LoginSignup from "./layout/LoginSignup";
import CourseBrief from "./components/CourseBrief";

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />}>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addCourse" element={<CreateCourse/>}/>
          <Route path="/courses" element={<ShowCourses/>}/>
          <Route path="/courses/:courseId" element={<CourseBrief/>}/>

          <Route path="*" element={<h1>404 page not Found</h1>} />
        </Route>
        {/* <Route path="/" element={<Landing />} />
                <Route path="/about" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
