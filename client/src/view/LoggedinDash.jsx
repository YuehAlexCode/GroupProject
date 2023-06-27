import React from "react";
import Navbar from "./Navbar";
import User from "../components/User";

const Dashboard = (props) => {
    return (
        <div className="container">
            <Navbar/>
            <div  className="col-md-12 mx-auto bg-light">
                <User/>
            </div>
        </div>
    );
};
export default Dashboard