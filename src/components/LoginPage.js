// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-na64.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful login
        setErrorMessage('');
        const { message } = await response.json();
        setSuccessMessage(message); // Set success message
        console.log(message); // Log to console, you can update this part
      } else {
        // Failed login
        const { error } = await response.json();
        setErrorMessage(error);
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Internal Server Error');
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
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

        <button type="submit">Submit</button>

        {/* "Contact Us" button */}
        <Link to="/contactus">
          <button className="secondary-button">Contact Us</button>
        </Link>
        <Link to="/signup">
          <button className="secondary-button">Signup</button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
