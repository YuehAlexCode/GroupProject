import React from "react";
import Navbar from "./Navbar";
import Placeholder from "../components/Placeholder";

const Dashboard = (props) => {
    return (
        <div className="container">
            <Navbar/>
            <div  className="col-md-12 mx-auto bg-light">
                <Placeholder/>
            </div>
        </div>
    );
};
export default Dashboard