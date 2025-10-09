import axios from "axios";

const api = axios.create({
    baseURL: "https://museum-34-backend-4.onrender.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;