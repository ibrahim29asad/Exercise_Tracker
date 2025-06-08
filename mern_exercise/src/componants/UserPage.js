import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './../App.css';

function UserPage() {
  const [Users, setUsers] = useState([]);

  const getAllUsers = () => {
    axios.get("http://localhost:5001/user").then((res) => {
      setUsers(res.data);
    });
  }

  useEffect(() => { getAllUsers() }, []);

  return (
    <div>
      <h1>Users</h1>
      <table className='UserTable'>
        <thead>
          <tr>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {Users && Users.map(student => {
            return (<tr key={student.username}>
              <td>{student.username}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;