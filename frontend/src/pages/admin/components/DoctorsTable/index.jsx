import React from "react"
import GridRow from "../GridRow"

import "./styles.css"

const DoctorsTable = ({ doctors }) => {
    const tableHead = {
        user_id: "User Name",
        doctor_id: "doctor Id",
        username: "Username",
        first_name: "First Name",
        last_name: "Last Name",
        email: "email",
        date_of_birth: "Date Of Birth",
        gender: "Gender",
        phone_number: "Phone Number",
        address: "Adress",
        specialization: "Specialization",
    }

    return (
        <div className='doctors-table'>
            <GridRow obj={tableHead} isHead={true} />
            {Array.isArray(doctors) ? (
                <div>loding</div>
            ) : (
                Object.keys(doctors).map((key, index) => {
                    if (!isNaN(parseInt(key))) {
                        return <GridRow key={index} obj={doctors[key]} />
                    }
                    return null // Skip non-numeric keys
                })
            )}
        </div>
    )
}

export default DoctorsTable
