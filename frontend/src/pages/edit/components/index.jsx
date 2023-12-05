import React from "react"

import "./styles.css"
import { useParams } from "react-router-dom"

const EditBody = () => {
    const { id } = useParams()
    return (
        <div>
            <form className='edit-form d-flex flex-column'>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' value={"hi"} />
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' value={"hi"} />
                </div>
                <div>
                    <label htmlFor='role'>Role: </label>
                    <input type='text' value={"hi"} disabled />
                </div>
                <div>
                    <label htmlFor='fname'>First Name: </label>
                    <input type='text' value={"hi"} />
                </div>
                <div>
                    <label htmlFor='lname'>Last Name: </label>
                    <input type='text' value={"hi"} />
                </div>
                <div>
                    <label htmlFor='phoneNumber'>Phone Number: </label>
                    <input type='number' value={123131} />
                </div>
                <div>
                    <label htmlFor='dob'>Date of Birth: </label>
                    <input type='date' value={"2000-08-08"} />
                </div>
                <div>
                    <label htmlFor='gender'>Gender: </label>
                    <select name='gender' id='gender' value={"female"}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='address'>Address: </label>
                    <input type='text' value={"hi"} />
                </div>
                <div>
                    <label htmlFor='medicalHistory'>Medical History: </label>
                    <input type='text' value={"hi"} />
                </div>
                <div>
                    <label htmlFor='specialization'>Specialization: </label>
                    <input type='text' value={"hi"} />
                </div>
                <input type='submit' value='Submit' className='btn' />
            </form>
        </div>
    )
}

export default EditBody
