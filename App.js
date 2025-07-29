import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">Book Review App</Link>
          <div>
            <Link to="/" className="nav-link d-inline mx-2 text-white">Home</Link>
            {!isLoggedIn && (
              <>
                <Link to="/login" className="nav-link d-inline mx-2 text-white">Login</Link>
                <Link to="/register" className="nav-link d-inline mx-2 text-white">Register</Link>
              </>
            )}
            {isLoggedIn && (
              <button className="btn btn-outline-light btn-sm ms-3" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="container mt-4 text-center">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
