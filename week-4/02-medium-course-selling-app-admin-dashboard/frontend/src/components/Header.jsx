import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const userLoggedIn = localStorage.getItem('userName');
  const username = localStorage.getItem("userName");
  return (
    <>
      <header className="bg-gray-500">
        <nav className="flex p-2 py-4 text-md text-white items-center  sm:text-lg w-4/5 mx-auto justify-between">
         <Link to={'/'}>Coursera</Link>
          <div className="right flex items-center gap-4">
            {username && (
              <>
                <Link to="/addcourse">AddCourse</Link>
                <Link to="/courses">Courses</Link>
                <button 
                onClick={()=>{
                  localStorage.removeItem('userName');
                  window.location.reload();
                }}
                className="bg-red-500 p-2 rounded-md">LogOut</button>
              </>
            )}
            {!username && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
