import React, { useEffect,useState } from "react";
import axios from "axios";

const DisplayAll = (props) => {
    const [userData, setUserData] = useState([]);
 
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/users")
        .then((res) => {
          console.log(res);
          setUserData(res.data);
        })
        .catch((err) => console.log(err.res));
    }, []);

    return (
      <div  className="container bg-light">
        <div className="col-md-4 mx-auto">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>HighScore</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => {
              return (
                <tr key={user._id}>
                    <td >{user.firstName} {user.lastName}</td>
                    <td>{user.highScore}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    );
  };

export default DisplayAll;