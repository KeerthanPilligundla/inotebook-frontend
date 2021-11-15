import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentails, setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
    const {showAlert} = props
    const handleSubmit = async(e) => {
        e.preventDefault();
        const url =" http://localhost:5000/api/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:credentails.email, password:credentails.password}),
        });
        console.log(response.status)
        if(response.status===201){
            const json = await response.json();
            localStorage.setItem('token',json.authToken);
            navigate("/")
            showAlert("Login Successfully","success")
        }else{
            console.log("Hi")
            showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) =>{
        setCredentials({...credentails,[e.target.name]: e.target.value})
    }

    return (
        <div className="my-3">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentails.email} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  value={credentails.password} id="password" name="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
