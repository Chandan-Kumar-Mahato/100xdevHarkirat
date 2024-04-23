import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(null);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storeUsername = localStorage.getItem("userName");
    if (storedToken) {
      setUsername(storeUsername);
      isLoading(false);
    }
  }, []);

  if (username) {
    return (
      <div className="w-4/5 mx-auto my-2 flex justify-between">
        <div className="left">
          <h1 className="text-2xl"> Welcome {username}</h1>
        </div>
        <div
          className="right"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            setUsername(null);
          }}
        >
          <button className="bg-red-500 rounded-md p-2">LogOut</button>
        </div>
      </div>
    );
  }

  return (
    <div className="border w-4/5 mx-auto flex flex-col p-7 items-center">
      <h1 className="text-3xl font-bold">Welcome back</h1>

      <input
        className="outline-none border p-2 w-1/2 sm:w-1/3 my-4"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="outline-none border p-2 w-1/2 sm:w-1/3 my-4"
        type="password"
        placeholder="Enter Passowrd"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-lg w-1/3 sm:w-1/4"
        onClick={() => {
          axios
            .post("http://localhost:3000/admin/login", {
              email,
              password,
            })
            .then((resp) => {
              console.log(resp.data);
              localStorage.setItem("token", resp.data.token);
              localStorage.setItem("userName", resp.data.userName);
              // if i am not doing this this will not update the window and changes will not seen imideatly
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
