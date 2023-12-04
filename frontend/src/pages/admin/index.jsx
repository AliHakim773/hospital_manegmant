import React, { useEffect } from "react"
import { useSelector } from "react-redux"

import { requestData } from "../../core/axios"
import { extractUserSlice } from "../../core/redux/user/userSlice"

import Header from "../../components/Header"

import "./styles.css"
import { useNavigate } from "react-router-dom"

function Admin() {
    const userState = useSelector(extractUserSlice)
    const navigate = useNavigate()

    useEffect(() => {
        if (userState.role != "admin") {
            navigate("/")
        }
        const get = async () => {
            const token = localStorage.getItem("token")
            const headers = {
                Authorization: `${token}`,
            }
            if (!token) {
                console.error("Token not available")
                return
            }
            const patientsData = await requestData(
                "/patients/get_patients.php",
                "GET",
                {},
                headers
            )
            const doctorssData = await requestData(
                "/doctors/get_doctors.php",
                "GET",
                {},
                headers
            )
        }
        get()
    }, [])
    return (
        <div>
            <Header />
            <main>
                <div className='table-nav d-flex flex-center'>
                    <div className='patients-table btn'>
                        Show Patients Table
                    </div>
                    <div className='doctors-table btn'>Show Doctors Table</div>
                    {/* <div className='patient-table btn'>Show Patient Table</div> */}
                </div>
            </main>
        </div>
    )
}

export default Admin
