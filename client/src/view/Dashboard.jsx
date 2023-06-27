import React from "react";
import Navbar from "./Navbar";
import DisplayAllScores from "../components/DisplayAllScores";
import Tetris from "../components/Tetris";


const Dashboard = (props) => {
    return (
        <div className="container">
            <Navbar/>
                <div  className="bg d-flex col-md-12 mx-auto">
                    <Tetris/>
                    <DisplayAllScores/>
                </div>
        </div>
    );
};
export default Dashboard