// UserPage.js
import React, { useEffect, useState } from 'react';

const UserPage = ({ match, history }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = match.params.userId;
      const token = localStorage.getItem('token');

      if (!token) {
        // Redirect to login if no token is found
        history.push('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/user/${userId}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // Redirect to login if the token is invalid or expired
          history.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [match.params.userId, history]);

  return (
    <div className="user-page-container">
      <h1>User Page</h1>
      {userData && (
        <div>
          <p>User ID: {userData.userId}</p>
          <p>Username: {userData.username}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
