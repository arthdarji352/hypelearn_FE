import axios from "../axiosConfig";

const CourseService = {
  getAllCourses: async ({ setAllCourses, setIsCourseLoading, onError }) => {
    setIsCourseLoading(true);
    return axios(false)
      .get(`/subscriber/get_all_courses`)
      .then(({ data }) => {
        setAllCourses(data);
        setIsCourseLoading(false);
        // console.log("all course data------------------", data);
        return data.results;
      })
      .catch((error) => {
        setIsCourseLoading(false);
        onError(error);
        return error;
      });
  },
  getCourse: async (data) => {
    return await axios
      .post(`/api/get_courses`, data)
      .then(({ data }) => {
        // console.log('course name ------------------', data)
        return data;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  },
};

export default CourseService;
