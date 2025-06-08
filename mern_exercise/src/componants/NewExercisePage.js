import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState } from 'react'
import axios from 'axios'
import './../App.css';

// Create a User

function NewExercisePage() {
  const [exercise, setExercise] = useState({ 
    username: "",
    description: "",
    duration: 0,
    date: new Date().toISOString().split('T')[0] // Default to today's date
  });
  const [error, setError] = useState(false);        
  const [message, setMessage] = useState("");
  
  const AddExercise = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5001/exercise/add', exercise)
      .then(res => {
        setMessage(`Exercise for ${exercise.username} has been added`);
        setExercise({ 
          username: "",
          description: "",
          duration: 0,
          date: new Date().toISOString().split('T')[0]
        });
        setError(false);
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          setError(true);
          setMessage("Error adding exercise: " + err.response.data);
        } else {
          console.error("Error adding exercise:", err);
          setMessage("Error adding exercise");
        }
      });
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExercise(prev => ({
      ...prev,
      [name]: name === 'duration' ? Number(value) : value
    }));
  }
  
  return (
    <div className="MainBody">
      <form onSubmit={AddExercise}>
        <h2>Create New Exercise</h2>
        <div className='SubmitBox'>

            Username:
            <br />
            <input 
              className="search-input" 
              type="text"  
              name="username" 
              value={exercise.username}
              onChange={handleInputChange}
              required
            />

          <br />
          

            Description:
            <br />
            <input 
              className="search-input" 
              type="text"  
              name="description" 
              value={exercise.description}
              onChange={handleInputChange}
              required
            />

          <br />
          
          
            Duration (minutes):
            <br />
            <input 
              className="search-input" 
              type="number"  
              name="duration" 
              value={exercise.duration}
              onChange={handleInputChange}
              min="1"
              required
            />
          
          <br />
          

            Date:
            <br />
            <input 
              className="search-input" 
              type="date"  
              name="date" 
              value={exercise.date}
              onChange={handleInputChange}
              required
            />

          <br />
        </div>
        <button className="Submit" type="submit">Submit</button>
        {message && (
          <p className={error ? "error-message" : "success-message"}>{message}</p>
        )}
      </form>
    </div>
  );
}

export default NewExercisePage;