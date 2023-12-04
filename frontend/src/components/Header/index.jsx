import React from "react"
import { Link, useNavigate } from "react-router-dom"

import { useSelector } from "react-redux"

import { extractUserSlice } from "../../core/redux/user/userSlice"

import "./styles.css"

const Header = () => {
    const userState = useSelector(extractUserSlice)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <header className='header d-flex'>
            <div className='logo'>Hospital System</div>
            <nav className='nav d-flex'>
                <Link to='/admin'>Admin</Link>
                <Link to='/patient'>Patient</Link>
                <Link to='/doctor'>Doctor</Link>
            </nav>
            <div className='account d-flex flex-center flex-column'>
                <div>{userState.username}</div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header
