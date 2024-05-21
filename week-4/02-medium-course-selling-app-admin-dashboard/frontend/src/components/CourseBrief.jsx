import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function CourseBrief() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  let token;
  useEffect(()=>{
     token = localStorage.getItem("token");
  },[])

  return (
     <div className="w-4/5 p-10 gap-4 flex   items-center border mx-auto">
      <CourseDetail courseId={courseId} setCourse={setCourse} course={course}/>
      <CourseUpdate courseId={courseId} setCourse={setCourse} course={course} />
    </div> 
  );
}

function CourseDetail({ courseId , setCourse , course }) {
  useEffect(() => {
    fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setCourse(resp);
      });
  }, [course.name , course.title , course.price , course.imageLink]);
  return (
    <div className="w-1/2 flex flex-col items-center p-3 border">
      <img src={`${course.imagePath}`} alt="This is the course image" />
      <h1 className="text-xl font-bold">{course.name}</h1>
      <p className="text-md">Price:{course.price}</p>
      <p className="text-md">Tutor:{course.Tutor} </p>
    </div>
  );
}

function CourseUpdate({ courseId  , course , setCourse}) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('' );
  const [tutor, setTutor] = useState('');
  const [imageLink, setImageLink] = useState('');


  useEffect(() => {
    setTitle(course.name || '');
    setPrice(course.price || '');
    setTutor(course.Tutor || '');
    setImageLink(course.imagePath || '');
  }, [course]);

  return (
    <div className="flex flex-col items-center w-1/2 border">
      <h1 className="text-2xl">Update Course</h1>
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
          fetch(`http://localhost:3000/admin/courses/${courseId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              name:title,
              price,
              Tutor:tutor,
              imagePath:imageLink,
            }),
          })
            .then((resp) => resp.json())
            .then((resp) => {
              setCourse({title , price , tutor , imageLink})
              console.log(resp);
            });
        }}
      >
        Update Course
      </button>
    </div>
  );
}

export default CourseBrief;
