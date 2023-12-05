import React, { useEffect, useState } from "react"

import "./styles.css"
import { requestData } from "../../../core/axios"
import { useNavigate } from "react-router-dom"

const EditBody = ({ user }) => {
    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({})
    useEffect(() => {
        setNewUser(user)
        console.log(user)
    }, [user])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))
    }
    const handleEdit = () => {
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: `${token}`,
        }
        if (!token) {
            console.error("Token not available")
            return
        }
        if (newUser.role == "doctor") {
            requestData("/doctors/edit.php", "POST", newUser, headers)
        } else if (newUser.role == "patient") {
            requestData("/patients/edit.php", "POST", newUser, headers)
        }
        navigate("/admin")
    }
    return (
        <div>
            <form className='edit-form d-flex flex-column'>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input
                        type='text'
                        name='username'
                        value={newUser.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input
                        name='email'
                        type='email'
                        value={newUser.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='role'>Role: </label>
                    <input type='text' value={newUser.role} disabled />
                </div>
                <div>
                    <label htmlFor='first_name'>First Name: </label>
                    <input
                        type='text'
                        name='first_name'
                        value={newUser.first_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='last_name'>Last Name: </label>
                    <input
                        type='text'
                        name='last_name'
                        value={newUser.last_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='phone_number'>Phone Number: </label>
                    <input
                        type='number'
                        name='phone_number'
                        value={newUser.phone_number}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='date_of_birth'>Date of Birth: </label>
                    <input
                        type='date'
                        name='date_of_birth'
                        value={newUser.date_of_birth}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='gender'>Gender: </label>
                    <select
                        name='gender'
                        id='gender'
                        value={newUser.gender}
                        onChange={handleInputChange}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='address'>Address: </label>
                    <input
                        type='text'
                        name='address'
                        value={newUser.address}
                        onChange={handleInputChange}
                    />
                </div>
                {newUser.role == "doctor" ? (
                    <div>
                        <label htmlFor='specialization'>Specialization: </label>
                        <input
                            type='text'
                            name='specialization'
                            value={newUser.specialization}
                            onChange={handleInputChange}
                        />
                    </div>
                ) : (
                    <div>
                        <label htmlFor='medical_history'>
                            Medical History:{" "}
                        </label>
                        <input
                            type='text'
                            name='medical_history'
                            value={newUser.medical_history}
                            onChange={handleInputChange}
                        />
                    </div>
                )}

                <input
                    type='submit'
                    value='Submit'
                    className='btn'
                    onClick={(e) => {
                        e.preventDefault()
                        handleEdit()
                    }}
                />
            </form>
        </div>
    )
}

export default EditBody
