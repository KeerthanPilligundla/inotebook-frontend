import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const [credentails, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();
    const {showAlert} = props
    const handleSubmit = async(e) => {
        e.preventDefault();
        const url =" http://localhost:5000/api/auth/createUser";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:credentails.name,email:credentails.email, password:credentails.password}),
        });
        console.log(response.status)
        if(response.status===201){
            const json = await response.json();
            //localStorage.setItem('token',json.authtoken);
            navigate("/login")
            showAlert("Signup succesfull, please login to continue","success")
        }else{
            showAlert("Invalid Details","Danger")
        }
    }
    const onChange = (e) =>{
        setCredentials({...credentails,[e.target.name]: e.target.value})
    }

    return (
        <div className="my-3">
            <h2>Create a account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" name="name" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name="email" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange}  id="password" name="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange}  id="cpassword" name="cpassword" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        </div>
    )
}

export default Signup
