// web/src/services/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if backend is hosted elsewhere
});

export default instance;
