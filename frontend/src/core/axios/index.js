// axiosConfig.js
import axios from "axios"

export const requestData = async (route, method, data, headers) =>
    await axios
        .request({
            url: `http://localhost/hospital_manegmant/api/${route}`,
            method,
            data,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        })
        .then((res) => {
            return res.data
        })
