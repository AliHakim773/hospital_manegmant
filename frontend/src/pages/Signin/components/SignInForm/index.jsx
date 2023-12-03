import React, { useRef, useState } from "react"

import "./styles.css"
import axios from "../../../../core/axios"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { setUser } from "../../../../core/redux/user/userSlice"
import { useNavigate } from "react-router-dom"

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

        await axios.post("auth/sign-in.php", body).then((res) => {
            if (res.data.status == "fail") {
                setError(res.data.msg)
            } else {
                // navigate("/sign-in")
                const token = res.data.token
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
        })
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
