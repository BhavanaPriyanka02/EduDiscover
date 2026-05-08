import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, User, LogOut, Heart, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <GraduationCap size={32} color="var(--primary-color)" />
          <span>EduDiscover</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/compare" className="nav-link">Compare</Link>
          
          {user ? (
            <>
              <Link to="/saved" className="nav-link">
                <Heart size={18} />
                <span>Saved</span>
              </Link>
              <div className="user-menu">
                <span className="user-name">
                  <User size={18} />
                  {user.name}
                </span>
                <button onClick={handleLogout} className="btn-logout" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
