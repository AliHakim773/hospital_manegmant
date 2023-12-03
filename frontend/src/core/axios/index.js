// axiosConfig.js
import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost/hospital_manegmant/api/", // Replace with your API domain
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance
