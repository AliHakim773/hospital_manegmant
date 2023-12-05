import React from "react"
import Header from "../../components/Header"
import AddForm from "./addForm"

const AddAppointment = () => {
    return (
        <div>
            <Header />
            <section className='section'>
                <div className='section-content'>
                    <div className='section-body'>
                        <AddForm />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddAppointment
