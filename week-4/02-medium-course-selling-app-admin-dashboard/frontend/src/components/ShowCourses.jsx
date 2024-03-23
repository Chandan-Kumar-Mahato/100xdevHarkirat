import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Link } from 'react-router-dom'
function ShowCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setCourses(resp);
      });
  }, []);

  const cardElement = courses.map((val) => {
    return (
        // this is the course card
      <div className="border m-2 p-2 w-1/4" key={val.id}>
        
        <Link to={`/courses/${val.id}`}>
        <img src={`${val.imageLink}`} alt="This is the image" />
        </Link>
        <h1 className="text-xl font-bold">{val.title}</h1>
        <p className="text-md">Price: {val.price}</p>
        <p className="text-md">Tutor: {val.tutor}</p>


      </div>
    );
  })

  return (
    <div className="w-4/5 mx-auto">
      <h1 className="text-2xl text-center font-bold">Courses</h1>

      <div className="flex flex-wrap ">
        {cardElement}
      </div>
    </div>
  );
}

export default ShowCourses;
