import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-4/5 mx-auto flex flex-col p-7 items-center">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Welcome to Course Selling
      </h1>

      <input
        className="outline-none border p-2 w-1/2  my-4"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="outline-none border p-2 w-1/2  my-4"
        type="password"
        placeholder="Enter Passowrd"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-lg w-1/3 sm:w-1/4"
        onClick={() => {
          axios
            .post("http://localhost:3000/admin/signup", {
              email,
              password,
            })
            .then((resp) => {
              console.log(resp.data);
              alert(`user created successfully`);
              setEmail("");
              setPassword("");
              navigate("/login");
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        }}
      >
        Signup
      </button>
    </div>
  );
}

export default Register;
