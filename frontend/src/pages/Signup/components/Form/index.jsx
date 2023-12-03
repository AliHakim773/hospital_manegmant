import React, { useRef } from "react"

import "./styles.css"

function Form() {
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

    const handleSubmit = () => {
        console.log(usernameEl.current.value)
    }

    return (
        <form className='form d-flex flex-column flex-wrap'>
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
            <div className='group-pair d-flex gap-1'>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='gender'>Gender</label>
                    <select name='gender' id='gender' ref={genderEl}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
                <div className='form-group d-flex flex-column'>
                    <label htmlFor='role'>Role</label>
                    <select name='role' id='role' ref={roleEl}>
                        <option value='patient'>Patient</option>
                        <option value='doctor'>Doctor</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
            </div>
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
