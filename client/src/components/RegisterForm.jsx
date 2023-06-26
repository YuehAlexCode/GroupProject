import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const formValidator = () => {
        let isValid = true
        if (userInfo.firstName.length < 2) {
            return false
        }
        if (userInfo.lastName.length < 2) {
            return false
        }
        if (userInfo.email.length < 2) {
            return false
        }
        if (userInfo.password.length < 8) {
            return false
        }
        if ( userInfo.password !== userInfo.confirmPassword) {
            return false
        }
        return isValid
        
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValidator()) {
            axios.post('http://localhost:8000/api/users/register', userInfo, {withCredentials: true})
                .then(res => console.log(res),
                    navigate("/Logged/:id"))
                .catch(err => console.log(err))
            }
            else{
                setErrors({
                    firstName: "First name must be at least 2 characters",
                    lastName: "Last name must be at least 2 characters",
                    email: "Email must be at least 2 characters",
                    password: "Password must be at least 8 characters",
                    confirmPassword: "confirm must be at least 8 characters",
                })
            }
               
    
    }  
    return(
    <div>
        <h1>Register Here</h1>
        <form action="" className="col-md-6 mx-auto" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" className="form-control" onChange={handleChange}/>
                {errors.firstName? <p className="text-danger">{errors.firstName}</p> : ""}
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" className="form-control" onChange={handleChange}/>
                {errors.lastName? <p className="text-danger">{errors.lastName}</p> : ""}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="form-control" onChange={handleChange}/>
                {errors.email? <p className="text-danger">{errors.email}</p> : ""}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="form-control" onChange={handleChange}/>
                {errors.password? <p className="text-danger">{errors.password}</p> : ""}
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" className="form-control" onChange={handleChange}/>
                {errors.confirmPassword? <p className="text-danger">{errors.confirmPassword}</p> : ""}
            </div>
            <button className="btn btn-primary">Register</button>

        </form>
    </div>
  )
}

export default RegisterForm