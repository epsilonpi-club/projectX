import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopNavBar.css';
import logo from '../../assets/logos/Black logo LQ.png';

export default function TopNavBar({ onToggleSidebar }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const location = useLocation();

    const unreadNotifications = 2;

    return (
        <header className="topnav">
            <div className="topnav-left">
                <button
                    className="topnav-menu-btn"
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                </button>
                <Link to="/" className="topnav-logo">
                    <div className="logo-icon">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </div>
                    <span className="logo-text">Student Portal</span>
                </Link>
            </div>

            <div className="topnav-center">
                <div className="search-container">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search events, clubs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="topnav-right">
                <div className="topnav-actions">
                    <div className="notification-wrapper">
                        <button
                            className="topnav-icon-btn"
                            onClick={() => setShowNotifications(!showNotifications)}
                            aria-label="Notifications"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            {unreadNotifications > 0 && (
                                <span className="notification-badge">{unreadNotifications}</span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="dropdown-menu notifications-dropdown">
                                <div className="dropdown-header">
                                    <h4>Notifications</h4>
                                    <Link to="/notifications" onClick={() => setShowNotifications(false)}>View all</Link>
                                </div>
                                <div className="dropdown-body">
                                    <div className="notification-item unread">
                                        <div className="notification-icon reminder">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                            </svg>
                                        </div>
                                        <div className="notification-content">
                                            <p className="notification-text">TechFest 2026 starts in 7 days</p>
                                            <span className="notification-time">2 hours ago</span>
                                        </div>
                                    </div>
                                    <div className="notification-item unread">
                                        <div className="notification-icon success">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                        </div>
                                        <div className="notification-content">
                                            <p className="notification-text">Registered for AI/ML Workshop</p>
                                            <span className="notification-time">5 hours ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="profile-wrapper">
                        <button
                            className="topnav-profile-btn"
                            onClick={() => setShowProfile(!showProfile)}
                            aria-label="Profile menu"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
                                alt="Profile"
                                className="avatar avatar-sm"
                            />
                        </button>

                        {showProfile && (
                            <div className="dropdown-menu profile-dropdown">
                                <div className="profile-info">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
                                        alt="Profile"
                                        className="avatar"
                                    />
                                    <div>
                                        <h4>Praneeth Chetty</h4>
                                        <p>21BCE1234</p>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <Link to="/profile" className="dropdown-item" onClick={() => setShowProfile(false)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    My Profile
                                </Link>
                                <Link to="/help" className="dropdown-item" onClick={() => setShowProfile(false)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                    </svg>
                                    Help & Support
                                </Link>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16,17 21,12 16,7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
