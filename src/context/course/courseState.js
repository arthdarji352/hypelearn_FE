import CourseContext from './courseContext';
import React, { useState } from 'react'
import axios from "axios"

const CourseState = ({children}) => {

  const [isCourseLoading, setIsCourseLoading] = useState(true);
  const [allCourses, setAllCourses] = useState([]);

    const getAllCourses = async () => {
        setIsCourseLoading(true);
        return axios
          .get(`/api/get_all_courses`)
          .then(({ data }) => {
            console.log("all course data------------------", data.data);
            setAllCourses(data.data);
            setIsCourseLoading(false);
            return data.data;
          })
          .catch((error) => {
            setIsCourseLoading(false);
            return error;
          });
      }

    return (
        <CourseContext.Provider value={{ isCourseLoading, allCourses, getAllCourses }}>
          {children}
        </CourseContext.Provider>
      )
}

export default CourseState;