import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

const Login = (props) => {
    return (
        <div className="container">
            <Navbar/>
            <div  className="col-md-12 mx-auto bg-light">
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;