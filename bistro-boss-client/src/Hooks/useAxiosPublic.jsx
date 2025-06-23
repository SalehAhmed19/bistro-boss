import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default function useAxiosPublic() {
  return axiosPublic;
}
