import React from "react"
import { Link } from "react-router-dom"

import "./styles.css"

function Home() {
    return (
        <div className='page home-page'>
            <div className='sign d-flex flex-center flex-column'>
                <Link className='btn ' to={"/sign-in"}>
                    Sign in
                </Link>
                <Link className='btn ' to={"/sign-up"}>
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default Home
