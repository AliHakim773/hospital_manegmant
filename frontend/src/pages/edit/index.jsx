import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { requestData } from "../../core/axios"

import Header from "../../components/Header"
import EditBody from "./components"

import "./styles.css"

const Edit = () => {
    const { role, id } = useParams()

    const [user, setUser] = useState({})

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
            if (role == "doctor") {
                const doctor = await requestData(
                    "/doctors/get_by_id.php?doctor_id=${id}",
                    "GET",
                    {},
                    headers
                )
                setUser(doctor.data)
            } else if (role == "patient") {
                const patient = await requestData(
                    `/patients/get_by_id.php?patient_id=${id}`,
                    "GET",
                    {},
                    headers
                )
                setUser(patient.data)
            }
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
                            <EditBody user={user} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Edit
