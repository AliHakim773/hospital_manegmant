import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { requestData } from "../../core/axios"
import { extractUserSlice } from "../../core/redux/user/userSlice"

import Header from "../../components/Header"

import "./styles.css"
import GridRow from "./components/GridRow"
import PatientsTable from "./components/PatiensTable"

function Admin() {
    const userState = useSelector(extractUserSlice)
    const navigate = useNavigate()

    const [patients, setPatients] = useState([])

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
            setPatients(patientsData)
            console.log(patients)
            const doctorssData = await requestData(
                "/doctors/get_doctors.php",
                "GET",
                {},
                headers
            )
            console.log(doctorssData)
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
                <div className='section'>
                    <div className='section-content'>
                        <div className='section-body'>
                            <PatientsTable patients={patients} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Admin
