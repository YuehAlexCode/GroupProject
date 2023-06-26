import React from "react";
import Navbar from "./Navbar";
import DisplayAllScores from "../components/DisplayAllScores";
import Tetris from "../components/Tetris";

const Dashboard = (props) => {
    return (
        <div className="container">
            <Navbar/>
            <div  className="d-flex col-md-12 mx-auto bg-light">
                <Tetris/>
                <DisplayAllScores/>
            </div>
        </div>
    );
};
export default Dashboard