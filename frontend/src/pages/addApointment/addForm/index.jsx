import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "./styles.css"

const AddForm = ({ patient }) => {
    const navigate = useNavigate()

    const [appointment, setAppointment] = useState({})
    const [doctors, setDoctors] = useState({})
    const [rooms, setRooms] = useState({})
    const [schedule, setSchedule] = useState({})

    useEffect(() => {}, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAppointment((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAdd = () => {
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: `${token}`,
        }
        if (!token) {
            console.error("Token not available")
            return
        }

        navigate("/admin")
    }
    return (
        <div>
            <form className='add-form d-flex flex-column'>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <select
                        name='doctor_id'
                        id='doctor_id'
                        onChange={handleInputChange}>
                        <option value=''></option>
                    </select>
                </div>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <select
                        name='room_id'
                        id='room_id'
                        onChange={handleInputChange}>
                        <option value=''></option>
                    </select>
                </div>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <select
                        name='schedule_id'
                        id='schedule_id'
                        onChange={handleInputChange}>
                        <option value=''></option>
                    </select>
                </div>

                <input
                    type='submit'
                    value='Add'
                    className='btn'
                    onClick={(e) => {
                        e.preventDefault()
                        handleAdd()
                    }}
                />
            </form>
        </div>
    )
}

export default AddForm
