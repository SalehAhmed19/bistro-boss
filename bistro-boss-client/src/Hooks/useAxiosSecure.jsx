import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api",
});

function useAxiosSecure() {
  const navigate = useNavigate();
  const { logOut } = useAuth();

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
    async (err) => {
      const status = err.response.status;
      console.log({ status });
      if (status === 401 || status === 403) {
        // log out the user
        await logOut();
        navigate("/authentication/login-email");
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
}

export default useAxiosSecure;
