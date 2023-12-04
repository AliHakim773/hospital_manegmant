import React from "react"

import "./styles.css"

const GridRow = ({ obj, isHead = false }) => {
    return (
        <div className='patient-grid-row'>
            <div className='grid-cell'>{obj.user_id}</div>
            <div className='grid-cell'>{obj.patient_id}</div>
            <div className='grid-cell'>{obj.username}</div>
            <div className='grid-cell'>{obj.first_name}</div>
            <div className='grid-cell'>{obj.last_name}</div>
            <div className='grid-cell'>{obj.email}</div>
            <div className='grid-cell'>{obj.date_of_birth}</div>
            <div className='grid-cell'>{obj.gender}</div>
            <div className='grid-cell'>{obj.phone_number}</div>
            <div className='grid-cell'>{obj.address}</div>
            <div className='grid-cell'>{obj.medical_history}</div>
            <div className='grid-cell'>
                {!isHead && (
                    <div className='d-flex flex-column'>
                        <button className='btn'>Edit</button>
                        <button className='btn'>X</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GridRow
