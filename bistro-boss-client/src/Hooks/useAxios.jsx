import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

function useAxios() {
  return axiosSecure;
}

export default useAxios;
