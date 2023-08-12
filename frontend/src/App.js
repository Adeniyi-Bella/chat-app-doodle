// app.js

import React, { useEffect, useState } from 'react';
import { getAllUsers } from './api/backendServices'; // Update the path if needed

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        // Handle error if needed
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.messages.map(msg => msg.message).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
