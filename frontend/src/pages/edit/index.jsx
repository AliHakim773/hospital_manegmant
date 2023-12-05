import React, { useEffect } from "react"

import { requestData } from "../../core/axios"

import Header from "../../components/Header"

import "./styles.css"
import EditBody from "./components"

const Edit = () => {
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
            // const getuser =
            // const patientsData = await requestData(
            //     "/patients/get_by_id.php",
            //     "GET",
            //     {},
            //     headers
            // )
            // setPatients(patientsData)
            // const doctorsData = await requestData(
            //     "/doctors/get_by_id.php",
            //     "GET",
            //     {},
            //     headers
            // )
            // setDoctors(doctorsData)
        }
        get()
    }, [])
    return (
        <div>
            <Header />
            <main>
                <section className='section'>
                    <div className='section-content'>
                        <div className='section-body'>
                            <EditBody />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Edit
