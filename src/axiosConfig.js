import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: window.location.origin,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Headers": "*",
  },
});
// instance.interceptors.request.use(
//     function (config) {
//         // Do something before request is sent

//         document.getElementById("loaderLayout").style.display = "flex";

//         return config;
//     },
//     function (error) {
//         // Do something with request error
//         document.getElementById("loaderLayout").style.display = "none";
//         return Promise.reject(error);
//     }
// );
// instance.interceptors.response.use(
//     function (response) {
//         console.log({ response });
//         document.getElementById("loaderLayout").style.display = "none";
//         if (response.status === 302) {
//             window.location.replace("/login/");
//         }
//         return response;
//     },
//     function (error) {
//         console.log({ error });
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         if (error.response.status === 500) {
//         } else if (
//             error.response.status === 405 &&
//             window.location.pathname !== "/login/"
//         ) {
//             window.location.replace("/login/");
//         }
//         document.getElementById("loaderLayout").style.display = "none";
//         return Promise.reject(error);
//     }
// ); // Removes interceptors from responses
export default instance;
