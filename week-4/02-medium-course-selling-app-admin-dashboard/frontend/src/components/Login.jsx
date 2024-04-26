import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // this her is the state to store the username in the localstorage
  return (
    <div className="border w-1/2 mx-auto flex flex-col py-10 mt-10 p-7 items-center">
      <h1 className="text-3xl font-bold">Welcome back</h1>

      <input
        className="outline-none border p-2 w-1/2  my-4"
        type="text"
        placeholder="Enter username of the admin"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="outline-none border p-2 w-1/2  my-4"
        type="password"
        placeholder="Enter Passowrd"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-lg w-[100px]"
        onClick={() => {
          axios
            .post("http://localhost:3000/admin/login", {
              username,
              password,
            })
            .then((resp) => {
              console.log(resp.data);
              localStorage.setItem("token", resp.data.token);
              localStorage.setItem("userName", resp.data.userName);
              // if i am not doing this this will not update the window and changes will not seen imideatly
              navigate('/');
              window.location.reload();
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
