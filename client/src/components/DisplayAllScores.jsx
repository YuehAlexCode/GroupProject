import React, { useEffect,useState } from "react";
import axios from "axios";
import { StyledHighScore, StyledHighScoreTable } from './styles/StyledHighScore';

const DisplayAll = (props) => {
    const [userData, setUserData] = useState([]);
    const [newEmail, newSetEmail] = useState([]);
    useEffect(() => {
      const storedUserInfo = localStorage.getItem('userInfo');
  
      if (storedUserInfo) {
        const email = JSON.parse(storedUserInfo);
        newSetEmail(email);
        console.log(email)
      }
    }, []);
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/users")
        .then((res) => {
          console.log(res);
          setUserData(res.data);
        })
        .catch((err) => console.log(err.res));
    }, []);
    const handleDeleteUser = (idFromBelow) => {
      axios
        .delete(`http://localhost:8000/api/users/${idFromBelow}`)
        .then((res) => {
          const newList = userData.filter(
            (user, index) => user._id !== idFromBelow
          );
          setUserData(newList);
        })
        .catch((err) => console.log(err.res));
    };

    return (
      <StyledHighScore  className="container bg-light">
        <div className="col-md-10 mx-auto">
        <StyledHighScoreTable>
          <table className="table table-dark table-striped ">
            <thead>
              <tr>
                <th>Name</th>
                <th>HighScore</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => {
                return (
                  <tr key={user._id}>
                      <td >{user.firstName} {user.lastName}</td>
                      <td>{user.highScore}</td>
                      <td>
                      <div>
                          {newEmail === user.email ? (
                             <button
                             onClick={() => handleDeleteUser(user._id)}
                             className="btn btn-danger"
                           >
                             DELETE
                           </button>
                          ) : (
                              <div className="text-light display-7">Not Logged</div>
                          )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </StyledHighScoreTable>
        </div>
      </StyledHighScore>
    );
  };

export default DisplayAll;