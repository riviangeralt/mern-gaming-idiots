import axios from "axios";
import { isAuthenticated } from "../auth/Auth";

const instanceApi = axios.create({
  baseURL: "http://localhost:8000/api/", //"https://gaming-idiots-server.herokuapp.com/api",
  validateStatus: function validateStatus(status) {
    let defaultError = status >= 200 && status < 300;
    let extra = status === 404;
    return defaultError || extra;
  },
});

instanceApi.interceptors.request.use(
  (config) => {
    const token = isAuthenticated().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instanceApi;
