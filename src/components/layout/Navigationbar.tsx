import React, { useState, type MouseEvent } from 'react';
import AuthModal from '../layout/AuthModal';
import type { AuthUser } from '../../Types/authypes';
import '../../styles/Navbar.css';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onNavigate?: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
 

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOpenAuthModal = (): void => {
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleCloseAuthModal = (): void => {
    setIsAuthModalOpen(false);
  };

  const handleLoginSuccess = (userData: AuthUser): void => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false);
  };

  const handleNavigation = (e: MouseEvent<HTMLAnchorElement>, page: string): void => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/" onClick={(e) => handleNavigation(e, 'home')}>
              EduCoach
            </a>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Menu */}
          <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  href="/"
                  className="nav-link"
                  onClick={(e) => handleNavigation(e, 'home')}
                >
                  Home
                </a>
              </li>

              {/* School Medium Dropdown */}
              <li className="nav-item dropdown">
                <a href="#" className="nav-link">
                  School Medium
                  <span className="dropdown-arrow">▼</span>
                </a>
                <div className="dropdown-menu">
                  <a href="/medium/marathi" className="dropdown-item">
                    Marathi Medium
                  </a>
                  <a href="/medium/english" className="dropdown-item">
                    English Medium
                  </a>
                  <a href="/medium/semi-english" className="dropdown-item">
                    Semi-English Medium
                  </a>
                </div>
              </li>

              {/* Grade Dropdown */}
              <li className="nav-item dropdown">
                <a href="#" className="nav-link">
                  Grade
                  <span className="dropdown-arrow">▼</span>
                </a>
                <div className="dropdown-menu">
                  <a href="/grade/7" className="dropdown-item">
                    Grade 7
                  </a>
                  <a href="/grade/8" className="dropdown-item">
                    Grade 8
                  </a>
                  <a href="/grade/9" className="dropdown-item">
                    Grade 9
                  </a>
                  <a href="/grade/10" className="dropdown-item">
                    Grade 10
                  </a>
                </div>
              </li>

              <li className="nav-item">
                <Link to="Coaching-Classes-website/aboutus" className="nav-link">
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="Coaching-Classes-website/contactus"
                  className="nav-link"                  
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Auth Section */}
            <div className="navbar-auth">
              {!isLoggedIn ? (
                <button className="btn-signup" onClick={handleOpenAuthModal}>
                  Student Login/Register
                </button>
              ) : (
                <div className="profile-menu-container">
                  <button
                    className="profile-button"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    aria-label="Profile menu"
                    aria-expanded={showProfileMenu}
                  >
                    <div className="profile-avatar">
                      <span>{user?.fullName?.charAt(0) || 'S'}</span>
                    </div>
                    <span className="profile-name">
                      {user?.fullName || 'Student'}
                    </span>
                    <span className="dropdown-arrow">▼</span>
                  </button>

                  {showProfileMenu && (
                    <div className="profile-dropdown">
                      <a href="/profile" className="profile-dropdown-item">
                        My Profile
                      </a>
                      <a href="/courses" className="profile-dropdown-item">
                        My Courses
                      </a>
                      <a href="/assignments" className="profile-dropdown-item">
                        Assignments
                      </a>
                      <a href="/settings" className="profile-dropdown-item">
                        Settings
                      </a>
                      <hr className="profile-divider" />
                      <button
                        onClick={handleLogout}
                        className="profile-dropdown-item logout"
                        type="button"
                      >
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;