import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/users">Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/users/add">Add Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/exercise">Exercise</Link>
          </li>
          <li className="nav-item">
            <Link to="/exercise/add">Add Exercise</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;