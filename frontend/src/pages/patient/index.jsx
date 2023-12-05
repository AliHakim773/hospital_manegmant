import React from "react"

import "./styles.css"
import Header from "../../components/Header"

const Patient = () => {
    return (
        <div>
            <Header />
            <section className='section'>
                <div className='section-content'>
                    <button className='btn'>Add Appointment</button>
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
