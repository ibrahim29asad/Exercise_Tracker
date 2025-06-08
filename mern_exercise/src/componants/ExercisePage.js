import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../App.css';

function ExercisePage() {
  const [Exercises, setExercises] = useState([]);
  const [FilterExercises, setFilterExercises] = useState([]);
  const [SearchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({
    _id: '',
    username: '',
    description: '',
    duration: '',
    date: '',
  });

  const getAllExercises = () => {
    axios.get('http://localhost:5001/exercise').then((res) => {
      setExercises(res.data);
      setFilterExercises(res.data);
    });
  };

  useEffect(() => {
    getAllExercises();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = Exercises.filter(
      (exercise) =>
        exercise.username.toLowerCase().includes(term) ||
        exercise.description.toLowerCase().includes(term)
    );
    setFilterExercises(filtered);
  };

  const updateExs = (exercise) => {
    setCurrentExercise({
      _id: exercise._id,
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toISOString().substring(0, 10),
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExercise({ ...currentExercise, [name]: value });
  };

  const submitUpdate = () => {
    axios
      .post(`http://localhost:5001/exercise/update/${currentExercise._id}`, currentExercise)
      .then(() => {
        setShowModal(false);
        getAllExercises();
      })
      .catch((err) => console.error('Update failed:', err));
  };

  const DelExs = (id) => {
    axios
      .delete(`http://localhost:5001/exercise/${id}`)
      .then(() => {
        const updatedList = Exercises.filter((ex) => ex._id !== id);
        setExercises(updatedList);
        setFilterExercises(updatedList);
      })
      .catch((err) => {
        console.error('Delete failed:', err);
      });
  };

  return (
    <div className="MainBody">
      <h1>Exercises</h1>
      <input type="text" placeholder="Search" value={SearchTerm} onChange={handleSearch} />

      <table className="UserTable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Exercises</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {FilterExercises &&
            FilterExercises.map((exercise) => (
              <tr key={exercise._id}>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{new Date(exercise.date).toLocaleDateString()}</td>
                <td>
                  <button className="UpdateBtn" onClick={() => updateExs(exercise)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className="UpdateBtn" onClick={() => DelExs(exercise._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" color='black'>
          <div className="modal-content" color='black'>
            <h2>Edit Exercise</h2>
            Username:
            <input
              type="text"
              name="username"
              value={currentExercise.username}
              onChange={handleInputChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={currentExercise.description}
              onChange={handleInputChange}
            />
            <label>Duration (minutes):</label>
            <input
              type="number"
              name="duration"
              value={currentExercise.duration}
              onChange={handleInputChange}
            />
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={currentExercise.date}
              onChange={handleInputChange}
            />
            <br />
            <button onClick={submitUpdate}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExercisePage;
