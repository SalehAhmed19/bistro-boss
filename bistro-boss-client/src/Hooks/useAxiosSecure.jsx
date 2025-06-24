// import axios from "axios";
// import { useNavigate } from "react-router";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:4000/api",
// });

// function useAxiosSecure() {
//   const navigate = useNavigate();
//   const { logOut } = useAuth();

//   // request interceptor to add authorization header for every secure call to the api
//   axiosSecure.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem("access-token");
//       config.headers.authorization = `Bearer ${token}`;
//       return config;
//     },
//     (err) => {
//       return Promise.reject(err);
//     }
//   );

//   // intercepts 401 and 403 status
//   axiosSecure.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (err) => {
//       const status = err.response.status;
//       console.log({ status });
//       if (status === 401 || status === 403) {
//         // log out the user
//         await logOut();
//         navigate("/authentication/login-email");
//       }
//       return Promise.reject(err);
//     }
//   );

//   return axiosSecure;
// }

// export default useAxiosSecure;
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { useEffect } from "react"; // <-- Import useEffect

function useAxiosSecure() {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Create the axios instance INSIDE the hook
  // This ensures navigate and logOut are in scope when the interceptors are set up
  const axiosSecure = axios.create({
    baseURL: "http://localhost:4000/api",
  });

  // Use useEffect to add interceptors only once when the component mounts
  // and clean them up when it unmounts.
  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        // Only add header if token exists
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        const status = err.response?.status; // Use optional chaining for safety
        console.log({ status });
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/authentication/login-email");
        }
        return Promise.reject(err);
      }
    );

    // Cleanup function: remove interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate, axiosSecure]); // Dependencies for useEffect

  return axiosSecure;
}

export default useAxiosSecure;
