import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

    const [creds, setcreds] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(JSON.stringify(
            {
                name: creds.name,
                email: creds.email,
                password: creds.password,
                location: creds.location
            }
        ))
        const response = await fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name: creds.name,
                    email: creds.email,
                    password: creds.password,
                    location: creds.location
                }
            )
        })
        const json = await response.json()
        console.log(json)

        if (!json.success) {
            alert("Enter Valid Credentials")
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={creds.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={creds.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={creds.password} id="exampleInputPassword1" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='location' value={creds.location} id="exampleInputAddress1" onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a User?</Link>
                </form>
            </div>
        </>
    )
}

export default Signup
