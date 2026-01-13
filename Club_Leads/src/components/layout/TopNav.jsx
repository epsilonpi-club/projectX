import { useState } from 'react';
import { currentClub, notifications } from '../../data/mockData';
import './TopNav.css';

export default function TopNav() {
    const [showNotifications, setShowNotifications] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="topnav">
            <div className="topnav-left">
                <button className="menu-btn mobile-only">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <div className="search-container">
                    <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search events, members..."
                    />
                </div>
            </div>

            <div className="topnav-right">
                <button
                    className="topnav-btn notification-btn"
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                    {unreadCount > 0 && (
                        <span className="notification-badge">{unreadCount}</span>
                    )}
                </button>

                {showNotifications && (
                    <div className="notifications-dropdown">
                        <div className="dropdown-header">
                            <h3>Notifications</h3>
                            <button className="btn btn-ghost btn-sm">Mark all read</button>
                        </div>
                        <div className="notifications-list">
                            {notifications.slice(0, 5).map(notification => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                >
                                    <div className={`notification-icon ${notification.type}`}>
                                        {notification.type === 'approval' && '✓'}
                                        {notification.type === 'registration' && '👤'}
                                        {notification.type === 'pending' && '⏳'}
                                    </div>
                                    <div className="notification-content">
                                        <p className="notification-title">{notification.title}</p>
                                        <p className="notification-message">{notification.message}</p>
                                        <span className="notification-time">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="user-menu">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                        alt="User"
                        className="user-avatar"
                    />
                    <div className="user-info desktop-only">
                        <span className="user-name">Praneeth Chetty</span>
                        <span className="user-role">Club Lead</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
