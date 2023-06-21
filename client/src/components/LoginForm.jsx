import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom"

const LoginForm = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const onChangeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
            
        })
    }

    const formValidator = () => {
        let isValid = true
        if (userInfo.email.length < 3) {
            return false
        }
        if (userInfo.password.length < 8) {
            return false
        }
        return isValid
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValidator()) {
            axios.post('http://localhost:8000/api/users/login', userInfo, {withCredentials: true})
                .then(res => console.log(res),
                    navigate("/user/dashboard"))
                .catch(err => console.log(err))

            }
            else{
                setErrors({
                    email: "Invalid Credentials",
                    password: "Invalid Credentials",
                })
            }
            
    
    }               
    return(
        <div className='className="col-md-6 mx-auto'>
            <h1>Login Player</h1>
              <form action="" className="col-md-6 mx-auto" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" name="email" id="email" value={userInfo.email}  onChange={onChangeHandler}/> 
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" name="password" id="password" value={userInfo.password}  onChange={onChangeHandler}/>
                        {errors.password? <p className="text-danger">{errors.password}</p> : ""}
                </div>
                <div className="form-group">
                    <button className="btn btn-info mt-3">Login</button>
                </div>
              </form>
            <span className="global-nav-text">
                <Link to="/user/register">Create New Account</Link>
            </span>
        </div>
    )   
}
export default LoginForm