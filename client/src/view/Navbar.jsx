import React,{ useState } from 'react'
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
      email: "",
      password: "",
  })
  const [errors, setErrors] = useState({})
  const handleItemClick = (event) => {
      event.stopPropagation();
    }
  

  const onChangeHandler = (e) => {
      setUserInfo({
          ...userInfo,
          [e.target.name]: e.target.value
          
      })
  }
    const logout = () => {
    axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
        .then(res => console.log(res),
        navigate("/"))
        .catch(err => console.log(err))
  }
    

  const formValidator = () => {
      let isValid = true
      if (userInfo.email.length < 2) {
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
                navigate("/Logged"))
              .catch(err => console.log(err))
          }
          else{
              setErrors({
                  email: "Invalid Credentials",
                  password: "Invalid Credentials",
              })
    }
   
}    
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
    <div className="container-fluid">
        <div className="navbar-brand text-light">Tetris</div>
        <button type="button" className="navbar-toggler " data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
                <a href="/" className="nav-item nav-link text-light">Home</a>
                <div className="dropdown">
                  <button className="nav-item nav-link text-light" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <form action="" className="col-md-10 mx-auto" onSubmit={handleSubmit}>
                        <div onClick={handleItemClick} className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" name="email" id="email" value={userInfo.email}  onChange={onChangeHandler}/> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" name="password" id="password" value={userInfo.password}  onChange={onChangeHandler}/>
                                {errors.password? <p className="text-danger">{errors.password}</p> : ""}
                        </div>
                        <div className="form-group">
                            <button onClick={handleItemClick} className="btn btn-secondary mt-3">Login</button>
                        </div>
                        <span className="global-nav-text">
                        <Link to="/users/register">Create New Account</Link>
                    </span>
                      </form>  
                  </div>
                </div>
                <button href="#" onClick={logout} className="nav-item nav-link text-light">Logout</button>
            </div>
        </div>
    </div>
</nav>
  );
};


export default Navbar;



