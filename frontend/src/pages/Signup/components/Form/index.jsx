import React, { useRef, useState } from "react"

import axios from "../../../../core/axios"

import "./styles.css"
import { useNavigate } from "react-router-dom"

function Form() {
    const navigate = useNavigate()

    const usernameEl = useRef()
    const passwordEl = useRef()
    const fnameEl = useRef()
    const lnameEl = useRef()
    const emailEl = useRef()
    const phoneNumberEl = useRef()
    const addressEl = useRef()
    const dobEl = useRef()
    const genderEl = useRef()
    const roleEl = useRef()
    const medicalHistoryEl = useRef()
    const specializationEl = useRef()

    const [role, setRole] = useState("patient")
    const [error, setError] = useState("")

    const handleOnChange = (e) => {
        if (e.target.value == "doctor") setRole("doctor")
        else if (e.target.value == "patient") setRole("patient")
        else setRole("admin")
    }

    const handleSubmit = async () => {
        const medical_history = medicalHistoryEl.current
            ? medicalHistoryEl.current.value
            : null
        const specialization = specializationEl.current
            ? specializationEl.current.value
            : null
        const body = {
            username: usernameEl.current.value,
            password: passwordEl.current.value,
            f_name: fnameEl.current.value,
            l_name: lnameEl.current.value,
            dob: dobEl.current.value,
            address: addressEl.current.value,
            gender: genderEl.current.value,
            email: emailEl.current.value,
            role: roleEl.current.value,
            phone_number: phoneNumberEl.current.value,
            medical_history,
            specialization,
        }
        await axios.post("auth/sign-up.php", body).then((res) => {
            if (res.data.status == "fail") {
                setError(res.data.msg)
            } else {
                navigate("/sign-in")
            }
        })
    }

    return (
        <form className='form d-flex flex-column'>
            <div className='error'>{error}</div>
            <div className='group-pair d-flex gap-1'>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        ref={usernameEl}
                    />
                </div>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        ref={passwordEl}
                    />
                </div>
            </div>
            <div className='group-pair d-flex gap-1'>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='fname'>First Name</label>
                    <input type='text' name='fname' id='fname' ref={fnameEl} />
                </div>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='lname'>Last Name</label>
                    <input type='text' name='lname' id='lname' ref={lnameEl} />
                </div>
            </div>
            <div className='group-pair d-flex gap-1'>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' ref={emailEl} />
                </div>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input
                        type='number'
                        name='phoneNumber'
                        id='phoneNumber'
                        ref={phoneNumberEl}
                    />
                </div>
            </div>
            <div className='group-pair d-flex gap-1'>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        name='address'
                        id='address'
                        ref={addressEl}
                    />
                </div>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='dob'>Birth Date</label>
                    <input type='date' name='dob' id='dob' ref={dobEl} />
                </div>
            </div>
            <div className='group-pair d-flex gap-1 w-100'>
                <div className='form-group d-flex flex-column fb'>
                    <label htmlFor='gender'>Gender</label>
                    <select name='gender' id='gender' ref={genderEl}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
                <div className='form-group d-flex flex-column fb'>
                    <label htmlFor='role'>Role</label>
                    <select
                        name='role'
                        id='role'
                        ref={roleEl}
                        onChange={(e) => {
                            handleOnChange(e)
                        }}>
                        <option value='patient'>Patient</option>
                        <option value='doctor'>Doctor</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
            </div>
            {role == "patient" ? (
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='medical_history'>Medical History</label>
                    <textarea
                        name='medical_history'
                        id='medical_history'
                        cols='30'
                        rows='10'
                        ref={medicalHistoryEl}></textarea>
                </div>
            ) : role == "doctor" ? (
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='specialization'>Specialization</label>
                    <input
                        type='text'
                        name='dob'
                        id='dob'
                        ref={specializationEl}
                    />
                </div>
            ) : (
                ""
            )}
            <input
                type='submit'
                className='btn'
                value='Submit'
                onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            />
        </form>
    )
}

export default Form
