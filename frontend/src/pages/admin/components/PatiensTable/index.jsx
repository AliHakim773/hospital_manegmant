import React from "react"
import GridRow from "../GridRow"

import "./styles.css"

const PatientsTable = ({ patients }) => {
    const tableHead = {
        user_id: "User Name",
        patient_id: "Patient Id",
        username: "Username",
        first_name: "First Name",
        last_name: "Last Name",
        email: "email",
        date_of_birth: "Date Of Birth",
        gender: "Gender",
        phone_number: "Phone Number",
        address: "Adress",
        medical_history: "Medical Histor",
    }

    return (
        <div className='patients-table'>
            <GridRow obj={tableHead} isHead={true} />
            {Array.isArray(patients) ? (
                <div>loding</div>
            ) : (
                Object.keys(patients).map((key, index) => {
                    if (!isNaN(parseInt(key))) {
                        return <GridRow key={index} obj={patients[key]} />
                    }
                    return null // Skip non-numeric keys
                })
            )}
        </div>
    )
}

export default PatientsTable
