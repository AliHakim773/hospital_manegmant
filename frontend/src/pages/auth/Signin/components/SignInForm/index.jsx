import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { jwtDecode } from "jwt-decode"

import { setUser } from "../../../../../core/redux/user/userSlice"
import { requestData } from "../../../../../core/axios"

import "./styles.css"

function SignInForm() {
    const usernameEl = useRef()
    const passwordEl = useRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState("")

    const handleSubmit = async () => {
        const body = {
            username: usernameEl.current.value,
            password: passwordEl.current.value,
        }

        const data = await requestData("/auth/sign-in.php", "POST", body)
        if (data.status == "fail") {
            setError(data.msg)
        } else {
            // navigate("/sign-in")
            const token = data.token
            localStorage.setItem("token", token)
            const tokenData = jwtDecode(token)
            dispatch(setUser(tokenData))
            if (tokenData.role == "admin") {
                navigate("/admin")
            } else if (tokenData.role == "patient") {
                navigate("/patient")
            } else {
                navigate("/doctor")
            }
        }
    }

    return (
        <form className='form d-flex flex-column'>
            <div className='error'>{error}</div>
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

export default SignInForm
