import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Spinner from './Spinner'

const Login = (props) => {
    const [credentails, setCredentials] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const { showAlert } = props
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const url = "https://inoteboook.herokuapp.com/api/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentails.email, password: credentails.password }),
        });
        console.log(response.status)
        if (response.status === 201) {
            const json = await response.json();
            localStorage.setItem('token', json.authToken);
            navigate("/")
            setLoading(false)
            showAlert("Login Successfully", "success")
        } else {
            setLoading(false)
            showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentails, [e.target.name]: e.target.value })
    }

    return (
        <div className="my-3">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentails.email} aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentails.password} id="password" name="password" onChange={onChange} required />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" >Submit</button><Link type="button" className="btn btn-link mx-2" to="/forgot">Forgot Password?</Link>{loading && <Spinner />}
                </div>

            </form>
        </div>
    )
}

export default Login
