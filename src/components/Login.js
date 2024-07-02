import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();


    const handleSubmite = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //store auth token and redirect
            localStorage.setItem("token", json.authToken);
            props.showAlert("Logining successfully", "success");
            navigate("/");
            
        }
        else {
            props.showAlert("Invalid details", "danger");
        }
    }

    const onChanges = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='mt-2'>
            <h1 className='my-3'>Login to use iNotebook!</h1>
            <form onSubmit={handleSubmite}>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control my-2" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" autoComplete="email" placeholder="Enter email" onChange={onChanges} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control my-2" id="password" name='password' value={credentials.password} placeholder="Password" autoComplete="current-password" onChange={onChanges} />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login
