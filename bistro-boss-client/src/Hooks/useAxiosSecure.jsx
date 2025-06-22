import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

function useAxiosSecure() {
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      console.log("first", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      const status = err.response.status;
      console.log(status);
      return Promise.reject(err);
    }
  );

  return axiosSecure;
}

export default useAxiosSecure;
