import React,{ useState,useEffect } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';

const Navbar = () => {

  const [userInfo, setUserInfo] = useState({
      email: "",
      password: "",
  })
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');

    if (storedUserInfo) {
      const email = JSON.parse(storedUserInfo);
      getData(email);
    }
  }, []);


  const getData = async (email) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/users/` + email);
          setUserData(res.data);
          console.log(res.data);
                  
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  
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
        localStorage.clear(),
        window.location.reload())
        .catch(err => console.log(err))
  }
    

  const formValidator = () => {
      let isValid = true
      if (userInfo.email.length < 4) {
          return false
      }
      if (userInfo.password.length < 8) {
          return false
      }
      return isValid
  }
  const handleSubmit = async (e) => {
      e.preventDefault()
      if (formValidator()) {
          axios.post('http://localhost:8000/api/users/login', userInfo, {withCredentials: true})
              .then(res => console.log(res),
                localStorage.setItem('userInfo', JSON.stringify( userInfo.email )),
                console.log(userData),
                window.location.reload())
              .catch(err => console.log(err))
          }
          else{
              alert('Please check your username and password')
              setErrors({
                  email: "Invalid Credentials",
                  password: "Invalid Credentials",
              })
    }
   
}    
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
    <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarCollapse">
        <div>
            {userData != null ? (
                <h3 className="text-light display-7">{userData.firstName} {userData.lastName}</h3>
            ) : (
                <h3 className="text-light display-7">Guest</h3>
            )}
        </div>
        
            <div className="navbar-nav ms-auto">

                <a href="/" className="nav-item nav-link text-light uil uil-house-user">Home</a>
                
                <div className="dropdown">
                  <button className="nav-item nav-link text-light uil uil-signin" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                  </button>
                  <div className="dropdown-menu" onClick={handleItemClick} aria-labelledby="dropdownMenuButton">
                      <form action="" className="col-md-10 mx-auto" onSubmit={handleSubmit}>
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
                            <button onClick={handleItemClick} className="btn btn-secondary mt-3">Login</button>
                        </div>
                        <span className="global-nav-text">
                        <Link to="/users/register">Create New Account</Link>
                    </span>
                      </form>  
                  </div>
                </div>
                
                <button href="#" onClick={logout} className="nav-item nav-link text-light uil uil-signout">Logout</button>
            </div>
        </div>
    </div>
</nav>
  );
};


export default Navbar;



