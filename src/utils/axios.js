import axios from "axios";
import { host } from "../content/start";

axios.defaults.baseURL = host


axios.interceptors.request.use(config =>{ 
    const token = localStorage.getItem("adminToken")
    const authorization = token ? JSON.parse(token) : "";
    config.headers.autharization = authorization
    return config;
})

export default axios;