import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">EduCoach</a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/" className="nav-link">Home</a>
            </li>

            {/* School Medium Dropdown */}
            <li className="nav-item dropdown">
              <a href="#" className="nav-link">
                School Medium
                <span className="dropdown-arrow">▼</span>
              </a>
              <div className="dropdown-menu">
                <a href="/medium/marathi" className="dropdown-item">Marathi Medium</a>
                <a href="/medium/english" className="dropdown-item">English Medium</a>
                <a href="/medium/semi-english" className="dropdown-item">Semi-English Medium</a>
              </div>
            </li>

            {/* Grade Dropdown */}
            <li className="nav-item dropdown">
              <a href="#" className="nav-link">
                Grade
                <span className="dropdown-arrow">▼</span>
              </a>
              <div className="dropdown-menu">
                <a href="/grade/7" className="dropdown-item">Grade 7</a>
                <a href="/grade/8" className="dropdown-item">Grade 8</a>
                <a href="/grade/9" className="dropdown-item">Grade 9</a>
                <a href="/grade/10" className="dropdown-item">Grade 10</a>
              </div>
            </li>

            <li className="nav-item">
              <a href="/about" className="nav-link">About Us</a>
            </li>

            <li className="nav-item">
              <a href="/contact" className="nav-link">Contact Us</a>
            </li>
          </ul>

          {/* Auth Section */}
          <div className="navbar-auth">
            {!isLoggedIn ? (
              <button className="btn-signup" onClick={handleLogin}>
                Student Signup / Login
              </button>
            ) : (
              <div className="profile-menu-container">
                <button 
                  className="profile-button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="profile-avatar">
                    <span>S</span>
                  </div>
                  <span className="profile-name">Student</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                
                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <a href="/profile" className="profile-dropdown-item">My Profile</a>
                    <a href="/courses" className="profile-dropdown-item">My Courses</a>
                    <a href="/assignments" className="profile-dropdown-item">Assignments</a>
                    <a href="/settings" className="profile-dropdown-item">Settings</a>
                    <hr className="profile-divider" />
                    <button onClick={handleLogout} className="profile-dropdown-item logout">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
