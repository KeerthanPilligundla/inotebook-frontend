import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner';
const Forgot = (props) => {
    const [credentails, setCredentials] = useState({ email: "", number: "" })
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const { showAlert } = props;
    const onChange = (e) => {
        setCredentials({ ...credentails, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const url = " https://inoteboook.herokuapp.com/api/auth/changepasscheck";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentails.email, number: credentails.number }),
        });
        if (response.status === 200) {
            const json = await response.json();
            localStorage.setItem('id', json.id)
            setLoading(false)
            navigate("/changepassword")
            showAlert("Validated Successfully please enter new password", "success")
        } else {
            setLoading(false)
            showAlert("Invalid , Enter correct details", "danger")
        }
    }
    return (
        <div className="my-3">
            <h2>Please enter the following details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentails.email} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Enter last 4 digits of your registered phonenumber</label>
                    <input type="text" className="form-control" value={credentails.number} id="number" name="number" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
                <div>
                    {loading && <Spinner />}
                </div>
            </form>
        </div>
    )
}

export default Forgot
