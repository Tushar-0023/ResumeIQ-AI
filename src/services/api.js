import axios from "axios";

const API = axios.create({
  baseURL: "https://resumeiq-ai-fdq9.onrender.com/api",
});

export default API;
