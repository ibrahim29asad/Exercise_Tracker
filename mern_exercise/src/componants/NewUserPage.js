import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState } from 'react'
import axios from 'axios'
import './../App.css';

// Create a User

function NewUserPage() {
  const [User, setUser] = useState({username: ""});
  const [error, setError] = useState(false);        
  const [placeholder, setPlaceholder] = useState("Enter Username");
  
  const AddStudent = (e) =>{
    e.preventDefault();
    
    axios.post('http://localhost:5001/user/add', User)
      .then(res => {
        console.log(`User ${User.username} has been added`);
        setUser({ username: "" });
        setPlaceholder("Enter Username");
        setError(false);
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          setUser({ username: "" });
          setError(true);
          setPlaceholder("User already exists");
        } else {
          console.error("Error adding user:", err);
        }
      });
  }
  
  const HandleUserData = (e) =>{
    const NewUser = e.target.value;
    setUser({username: NewUser});
    if (error) {
      setError(false);           // reset error once user types again
      setPlaceholder("Enter Username"); // reset placeholder
    }
  }
  
  return (
    <div className="MainBody">
      <form onSubmit={AddStudent}>
      Create New User
      <div className='SubmitBox'>
        <input className="search-input" type="text"  name="username" id ="Username" 
               value={User.username}
               onChange={HandleUserData}
               placeholder={placeholder} />

        {/* <input className="search-input" type="text"  name="Username" id ="Username" placeholder="Enter Username" /> */}
      </div>
      <button className="Submit">Submit</button>
      </form>
    </div>
  );
}

export default NewUserPage;
