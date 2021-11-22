import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Spinner from './Spinner';

const Signup = (props) => {
    const [credentails, setCredentials] = useState({name:"",email:"",password:"",phoneNumber:""})
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const {showAlert} = props
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const url =" https://inoteboook.herokuapp.com/api/auth/createUser";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:credentails.name,email:credentails.email, password:credentails.password, phoneNumber:credentails.phoneNumber}),
        });
        if(response.status===201){
            const json = await response.json();
            setLoading(false)
            console.log(json)
            navigate("/login")
            showAlert("Signup succesfull, please login to continue","success")
        }else{
            setLoading(false)
            showAlert("Invalid Details","danger")
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
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" onChange={onChange}  id="phoneNumber" name="phoneNumber" minLength={10}  maxLength={10} required/>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Register</button>
                    {loading && <Spinner/>}
                </div>
                </form>
        </div>
    )
}

export default Signup
