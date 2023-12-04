import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { requestData } from "../../core/axios"
import { extractUserSlice } from "../../core/redux/user/userSlice"

import Header from "../../components/Header"

import "./styles.css"
import PatientsTable from "./components/PatiensTable"
import DoctorsTable from "./components/DoctorsTable"

function Admin() {
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])
    const [toggle, setToggle] = useState(true)

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
            const patientsData = await requestData(
                "/patients/get_patients.php",
                "GET",
                {},
                headers
            )
            setPatients(patientsData)
            const doctorsData = await requestData(
                "/doctors/get_doctors.php",
                "GET",
                {},
                headers
            )
            setDoctors(doctorsData)
        }
        get()
    }, [])
    return (
        <div>
            <Header />
            <main>
                <div className='table-nav d-flex flex-center'>
                    <div
                        className='patients-table btn'
                        onClick={() => {
                            setToggle(true)
                        }}>
                        Show Patients Table
                    </div>
                    <div
                        className='doctors-table btn'
                        onClick={() => {
                            setToggle(false)
                        }}>
                        Show Doctors Table
                    </div>
                    {/* <div className='patient-table btn'>Show Patient Table</div> */}
                </div>
                <div className='section'>
                    <div className='section-content'>
                        <div className='section-body'>
                            {toggle ? (
                                <PatientsTable patients={patients} />
                            ) : (
                                <DoctorsTable doctors={doctors} />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Admin
