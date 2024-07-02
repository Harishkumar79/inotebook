import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate();
  const { name, email, password } = credentials;

  const handleSubmite = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //store data token and redirect
      localStorage.setItem('token', json.jwtData)
      props.showAlert("Account created successfully", "success");
      navigate("/");
    }
    else {
      props.showAlert("Invalid credentials", "danger");
    }
  }

  const onChanges = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mt-2">
      <h1 className='my-3'>Create account to use iNotebook!</h1>
      <form onSubmit={handleSubmite}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChanges} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChanges} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChanges} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Conform Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChanges} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup

