import React, { useEffect } from "react"
import { requestData } from "../../core/axios"
import "./styles.css"

function Admin() {
    useEffect(() => {
        const get = async () => {
            const token = localStorage.getItem("token")
            const headers = {
                Authorization: `${token}`,
            }
            if (!token) {
                console.error("Token not available")
                return
            }
            const data = await requestData(
                "/patients/get_patients.php",
                "GET",
                {},
                headers
            )
            console.log(data)
        }
        get()
    }, [])
    return <div>Admin</div>
}

export default Admin
