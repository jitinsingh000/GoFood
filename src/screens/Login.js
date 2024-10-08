import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [creds, setcreds] = useState({
    email: "",
    password: ""
  })
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(
      {
        email: creds.email,
        password: creds.password
      }
    ))
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          email: creds.email,
          password: creds.password
        }
      )
    })
    const json = await response.json()
    console.log(json)

    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    else {
      localStorage.setItem("userEmail", creds.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/');
    }
  }

  const onChange = (event) => {
    setcreds({ ...creds, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={creds.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={creds.password} id="exampleInputPassword1" onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className="m-3 btn btn-danger">Not a User?</Link>
        </form>
      </div>
    </>
  )
}

export default Login
