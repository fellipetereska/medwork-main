import axios from "axios";

const api = new axios.create({
    baseURL: `http://localhost:8800`,
});


export default api;