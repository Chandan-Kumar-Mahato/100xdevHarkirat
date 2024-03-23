import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav className="flex p-2 py-4 text-md sm:text-lg w-4/5 mx-auto justify-between">
        <div className="left">
          <h1 className="sm:text-xl">Course Selling App</h1>
        </div>
        <div className="right flex gap-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/addcourse">Add Course</Link>
          <Link to="/courses">Courses</Link>
        </div>
      </nav>
    </>
  );
}
