import React from "react";

// this all are the part of the recoil varaiable
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atom/user";
import { userNameState } from "../store/selector/isUserName";
import { userLoading } from "../store/selector/isLoading";

import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const userName = useRecoilValue(userNameState);
  const Loading = useRecoilValue(userLoading);
  const setUser = useSetRecoilState(userState);

  // const userLoggedIn = localStorage.getItem('userName');

  if (Loading) {
    // cons/ole.log(userName)
    return <>Loading....</>;
  }

  // const username = localStorage.getItem("userName");
  return (
    <>
      <header className="bg-gray-500">
        <nav className="flex p-2 py-4 text-md text-white items-center  sm:text-lg w-4/5 mx-auto justify-between">
          <Link to={"/"}>Coursera</Link>
          <div className="right flex items-center gap-4">
            {userName && (
              <>
                <Link to="/addcourse">AddCourse</Link>
                <Link to="/courses">Courses</Link>
                <button
                  onClick={() => {
                    localStorage.setItem("token", null);

                    setUser({
                      isLoading: false,
                      userName: null,
                    });
                    navigate("/");
                  }}
                  className="bg-red-500 p-2 rounded-md"
                >
                  LogOut
                </button>
              </>
            )}
            {!userName && (
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
