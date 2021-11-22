import React, {  useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Spinner from './Spinner';
const Editprofile = (props) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const { showAlert } = props
    const getUser1 = async () => {
        //API todo
        const url = `https://inoteboook.herokuapp.com/api/auth/getuser`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "auth-token":
             localStorage.getItem('token'),
          },
        });
        const json = await response.json();
        setUser(json)
      };
    useEffect(() => {
        if(localStorage.getItem('token')){
            getUser1()
        }else{
            navigate("/login")
        }

        // eslint-disable-next-line
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const url = " https://inoteboook.herokuapp.com/api/auth/updateprofile";
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ name: user.name, email: user.email, phoneNumber: user.phoneNumber }),
        });
        if (response.status === 200) {
            await response.json();
            navigate("/")
            setLoading(false)
            showAlert("Profile Updated Sucessfully", "success")
        } else {
            setLoading(false)
            showAlert("Invalid Details", "danger")
        }
    }
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <div className="row my-3">
            <nav className="navbar navbar-light my-3" style={{ backgroundColor: "GhostWhite" }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">You can Edit Profile</span>
                    <ul className="navbar-nav mb-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="btn btn-outline-primary" role="button" aria-disabled="true" to="/resetpassword">Reset Password</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="text" className="form-control" value={user.name} onChange={onChange} id="name" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={user.email} onChange={onChange} id="email" name="email" required disabled readOnly/>
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" value={user.phoneNumber} onChange={onChange} id="phoneNumber" name="phoneNumber" minLength={10} maxLength={10} required />
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                </div>
                {loading && <Spinner/>}
            </form>
        </div>
    )
}

export default Editprofile
