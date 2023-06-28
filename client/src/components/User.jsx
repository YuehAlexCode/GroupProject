import React, { useEffect, useState } from 'react';
import axios from 'axios';

function User() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');

    if (storedUserInfo) {
      const email = JSON.parse(storedUserInfo);
      fetchData(email);
    }
  }, []);


  const fetchData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/` + email);
          setUserData(response.data);
          console.log(response.data);
        
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  

  };

  return (
    <div>
      <div>{userData.firstName}</div>
      <div>{userData.lastName}</div>
    </div>
  );
}

export default User;