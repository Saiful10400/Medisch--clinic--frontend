import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://assignment12-ten.vercel.app",
  // baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
