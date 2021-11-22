import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

const Changepassword = (props) => {
    const [credentails, setCredentials] = useState({ password: "", cpassword: "" })
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const { showAlert } = props;
    const onChange = (e) => {
        setCredentials({ ...credentails, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (credentails.password === credentails.cpassword) {
            const url = " https://inoteboook.herokuapp.com/api/auth/changepassword";
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "id-token": localStorage.getItem("id")
                },
                body: JSON.stringify({ password: credentails.password }),
            });
            if (response.status === 200) {
                setLoading(false)
                navigate("/login")
                localStorage.removeItem("id")
                showAlert("Password Changed Sucessfully, please login to conttinue", "success")
            } else {
                setLoading(false)
                showAlert("Please try again ", "danger")
            }
        } else {
            setLoading(false)
            showAlert("Password missmatch", "danger")
        }
    }
    return (
        <div className="my-3">
            <h2>Enter New Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentails.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentails.cpassword} id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Change Password</button>
                <div>
                    {loading && <Spinner/>}
                </div>
            </form>
        </div>
    )
}

export default Changepassword
