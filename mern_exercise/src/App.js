import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Make sure these paths are correct - note the spelling of "components"
import UserPage from './componants/UserPage';
import NewUserPage from './componants/NewUserPage';

import NewExercisePage from './componants/NewExercisePage';
import ExercisePage from './componants/ExercisePage';


import Header from './componants/header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="MainBody">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/add" element={<NewUserPage />} />
            <Route path="/exercise" element={<ExercisePage />} />
            <Route path="/exercise/add" element={<NewExercisePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function HomePage() {
  return <h1>Hello World</h1>;
}

export default App;