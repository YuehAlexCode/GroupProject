import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditForm = () => {
  const [gotEmail, setGotEmail] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const email = JSON.parse(storedUserInfo);
      setGotEmail(email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${gotEmail}`, userInfo);
      console.log('Score updated successfully!', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h1>Edit Name Here</h1>
      <form className="col-md-6 mx-auto" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="smallButton btn btn-primary">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditForm;
