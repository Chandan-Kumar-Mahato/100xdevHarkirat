import { Link } from "react-router-dom";
import React from "react";

import { useRecoilValue } from "recoil";
// i need to get the value from the selector --> this here is the selector and to get the value of the selector we use the useRecoilValue
import { userNameState } from "../store/selector/isUserName";
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
  const username = useRecoilValue(userNameState);
  return (
    <div className="flex w-full bg-gray-200 h-[580px] ">
      <div className="left flex-1 items-center flex  ">
        <div className="h-[180px] p-2 ml-10">
          <h1 className="text-4xl">Welcome to Coursera</h1>
          <p className="text-gray-500 text-xl">
            Here you can buy bunch of courses! <br /> Stay with us{" "}
          </p>

          {!username && (
            <>
              <div className="mt-10">
                <Link to={"/login"} className="bg-blue-500 p-2 rounded-md px-4">
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="bg-green-500 m-2 p-2 px-4 rounded-md text-white text-small"
                >
                  Register
                </Link>
              </div>
            </>
          )}
          {username &&
          <>
          <h1 className="text-3xl">Welcome {username}</h1>
          </>}
        </div>
      </div>
      <div className="right flex-1 flex justify-center items-center  ">
        <img
          className="rounded-md h-2/3 items-center"
          src="https://images.pexels.com/photos/6747386/pexels-photo-6747386.jpeg"
          alt=" this is the course selling app"
        />
      </div>
    </div>
  );
}

export default Landing;
