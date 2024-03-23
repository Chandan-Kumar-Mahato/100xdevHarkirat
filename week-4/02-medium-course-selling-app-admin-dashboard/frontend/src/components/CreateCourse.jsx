import React from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
import axios from "axios";
import { useState } from "react";
function CreateCourse() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [tutor, setTutor] = useState("");
  const [imageLink , setImageLink] = useState('');

  return (
    <div className="w-4/5 p-2 flex justify-center mx-auto items-center">
      <div className="border flex w-1/2 flex-col items-center">
        <h1 className="text-2xl my-5 font-mono font-semibold">
          You can add course here
        </h1>
        <input
          type="text"
          className="outline-none border p-2 w-1/2 my-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your course name"
        />
        <input
          type="number"
          className="outline-none border p-2 w-1/2 my-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter your course Price"
        />
        <input
          type="text"
          className="outline-none border p-2 w-1/2 my-2"
          value={tutor}
          onChange={(e) => setTutor(e.target.value)}
          placeholder="Enter your course Tutor"
        />
        <input
          type="text"
          className="outline-none border p-2 w-1/2 my-2"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          placeholder="Enter course image link"
        />

        <button
          className="bg-green-500 p-2 rounded-lg hover:text-black/60 w-1/3 my-5"
          onClick={() => {
            fetch("http://localhost:3000/admin/courses", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                title,
                price,
                tutor,
                imageLink
              }),
            })
              .then((resp) => resp.json())
              .then((resp) => {
                console.log(resp);
                alert(`course created Successfully`)
              });
          }}
        >
          Create Course
        </button>
      </div>
    </div>
  );
}
export default CreateCourse;
