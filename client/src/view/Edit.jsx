import React from "react";
import EditForm from "../components/EditForm";
import Navbar from "./Navbar";

const Register = (props) => {
    return (
        <div className="container">
            <Navbar/>
            <div  className="col-md-12 mx-auto bg-light">
                <EditForm/>
            </div>
        </div>
    );
};

export default Register;