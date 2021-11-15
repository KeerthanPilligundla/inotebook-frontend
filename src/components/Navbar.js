import React from 'react'
import {Link,useLocation} from "react-router-dom";
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate("/login")
    }
    let location = useLocation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar navbar-dark" style={{ backgroundColor: "#002966" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                    {(!localStorage.getItem('token'))?
                    <form className="d-flex">
                        <Link className="btn btn-light mx-1" to="/signup" role="button">Signup</Link>
                        <Link className="btn btn-light mx-1" to="/login" role="button">Login</Link>
                    </form>:
                    <form className="d-flex">
                        <Link className="btn btn-success mx-1" to="/edit" role="button">Edit Profile</Link>
                        <button type="button" className="btn btn-danger mx-1" onClick={handleLogout}>Logout</button>
                    </form>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar
