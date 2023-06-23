import React from "react";
import Navbar from "./Navbar";
import Placeholder from "../components/Placeholder";
import DisplayAllScores from "../components/DisplayAllScores";

const Dashboard = (props) => {
    return (
        <div className="container">
            <Navbar/>
            <div  className="d-flex col-md-12 mx-auto bg-light">
                <Placeholder/>
                <DisplayAllScores/>
            </div>
        </div>
    );
};
export default Dashboard