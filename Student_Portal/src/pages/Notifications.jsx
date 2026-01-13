import { Link } from 'react-router-dom';
import { notifications } from '../data/mockData';
import './Notifications.css';

export default function Notifications() {
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'reminder':
                return (
                    <div className="notification-icon-box reminder">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                        </svg>
                    </div>
                );
            case 'confirmation':
                return (
                    <div className="notification-icon-box confirmation">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>
                );
            case 'certificate':
                return (
                    <div className="notification-icon-box certificate">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="8" r="6" />
                            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                        </svg>
                    </div>
                );
            case 'attendance':
                return (
                    <div className="notification-icon-box attendance">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="notification-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </div>
                );
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return 'Yesterday';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="notifications-page">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Notifications</h1>
                    <p className="page-subtitle">Stay updated with your event activities</p>
                </div>
                {unreadCount > 0 && (
                    <button className="btn btn-ghost">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Mark all as read
                    </button>
                )}
            </div>

            <div className="notifications-list">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`notification-card card ${!notification.read ? 'unread' : ''}`}
                        >
                            {getNotificationIcon(notification.type)}
                            <div className="notification-body">
                                <h3 className="notification-title">{notification.title}</h3>
                                <p className="notification-message">{notification.message}</p>
                                <span className="notification-time">{formatTime(notification.timestamp)}</span>
                            </div>
                            {notification.eventId && (
                                <Link to={`/events/${notification.eventId}`} className="btn btn-outline btn-sm">
                                    View Event
                                </Link>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="empty-state card">
                        <div className="empty-state-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </div>
                        <h3 className="empty-state-title">No notifications</h3>
                        <p className="empty-state-description">
                            You're all caught up! Check back later for updates.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
