import React from "react"

import "./styles.css"
import { requestData } from "../../../../core/axios"
import { useNavigate } from "react-router-dom"

const GridRow = ({ obj, isHead = false }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: `${token}`,
        }
        if (!token) {
            console.error("Token not available")
            return
        }
        requestData(
            `/users/delete.php?user_id=${obj.user_id}`,
            "GET",
            {},
            headers
        )
        window.location.reload()
    }
    const handleEdit = () => {
        navigate(`/edit/${obj.patient_id ?? obj.doctor_id}`)
    }

    return (
        <div className='patient-grid-row'>
            <div className='grid-cell'>{obj.user_id}</div>
            <div className='grid-cell'>{obj.patient_id ?? obj.doctor_id}</div>
            <div className='grid-cell'>{obj.username}</div>
            <div className='grid-cell'>{obj.first_name}</div>
            <div className='grid-cell'>{obj.last_name}</div>
            <div className='grid-cell'>{obj.email}</div>
            <div className='grid-cell'>{obj.date_of_birth}</div>
            <div className='grid-cell'>{obj.gender}</div>
            <div className='grid-cell'>{obj.phone_number}</div>
            <div className='grid-cell'>{obj.address}</div>
            <div className='grid-cell'>
                {obj.medical_history ?? obj.specialization}
            </div>
            <div className='grid-cell'>
                {!isHead && (
                    <div className='d-flex flex-column'>
                        <button className='btn' onClick={handleEdit}>
                            Edit
                        </button>
                        <button className='btn' onClick={handleDelete}>
                            X
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GridRow
