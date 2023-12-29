// SignupPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SignupPage = ({ history }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-na64.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Signup successful! You can now login.');
        setErrorMessage('');
      } else {
        const { error } = await response.json();
        setErrorMessage(error);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('Internal Server Error');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="username">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">ConfirmPassword:</label>
        <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        />
        <button type="submit">Submit</button>

        {/* "Login" button */}
        <Link to="/">
          <button className="secondary-button">Login</button>
        </Link>

        {/* "Contact Us" button */}
        <Link to="/contactus">
          <button className="secondary-button">Contact Us</button>
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
