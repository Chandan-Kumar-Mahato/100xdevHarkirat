import { selector } from "recoil";

import { courseState } from "../atom/course";
export const CourseDetails = selector({
  key: "coursedetail",
  get: ({ get }) => {
    const state = get(courseState)
    return state.course;
  },
});

export const CourseTitle = selector({
    key:"courseTitle",
    get:({get})=>{
        const state = get(courseState)
        if(state.course)
        {
           return state.course.name
        }
    }
})
export const CoursePrice = selector({
    key:"coursePrice",
    get:({get})=>{
        const state = get(courseState)
        if(state.course)
        {
            return state.course.price
        }
    }
})

export const CourseTutor = selector({
    key:"coursePrice",
    get:({get})=>{
        const state = get(courseState)
        if(state.course)
        {
            return state.course.Tutor
        }
    }
})
export const CourseImage = selector({
    key:"coursePrice",
    get:({get})=>{
        const state = get(courseState)
        if(state.course)
        {
            return state.course.imagePath
        }
    }
})