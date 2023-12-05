import React from "react"

import "./styles.css"
import Header from "../../components/Header"
import { Link } from "react-router-dom"

const Patient = () => {
    return (
        <div>
            <Header />
            <section className='section'>
                <div className='section-content'>
                    <Link to={"/add-appointment"} className='btn'>
                        Add Appointment
                    </Link>
                </div>
            </section>
            <section className='section'>
                <div className='section-content'>
                    <div className='section-body'></div>
                </div>
            </section>
        </div>
    )
}

export default Patient
