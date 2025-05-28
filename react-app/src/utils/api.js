import axios from "axios";

console.log("axios instance")
console.log(process.env)
console.log(process.env.REACT_APP_API_BASE_URL)

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: BASE_URL
});

export default api;