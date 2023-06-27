import React from "react";
import RegisterForm from "../components/RegisterForm";
import Navbar from "./Navbar";

const Register = (props) => {
    return (
        <div className="container">
            <Navbar/>
            <div  className="col-md-12 mx-auto bg-light">
                <RegisterForm/>
            </div>
        </div>
    );
};

export default Register;