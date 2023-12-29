// ContactUsPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    submitted: false,
    success: false,
    error: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-na64.onrender.com/api/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Contact details submitted successfully!');
        setSubmissionStatus({ submitted: true, success: true, error: false });
      } else {
        console.error('Failed to submit contact details');
        setSubmissionStatus({ submitted: true, success: false, error: true });
      }
    } catch (error) {
      console.error('Error submitting contact details:', error);
      setSubmissionStatus({ submitted: true, success: false, error: true });
    }
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      {submissionStatus.submitted && (
        <div className={submissionStatus.success ? 'success-message' : 'error-message'}>
          {submissionStatus.success ? 'Data received successfully!' : 'Failed to submit data.'}
        </div>
      )}
      <form className="contact-us-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>

        {/* "Home" button inside the contact form */}
        <Link to="/">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </form>
    </div>
  );
};

export default ContactUsPage;

