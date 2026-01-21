import { Link } from 'react-router-dom';
import { pendingEvents, approvedEvents, recentActivity, stats } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
    // Get top 3 pending events for alert section
    const urgentEvents = pendingEvents.slice(0, 3);

    const statCards = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                </svg>
            ),
            label: 'Pending Requests',
            value: stats.pending,
            color: '#f59e0b',
            link: '/pending'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
            ),
            label: 'Approved (This Semester)',
            value: stats.approved,
            color: '#10b981'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <circle cx="12" cy="15" r="2" />
                </svg>
            ),
            label: 'Events Today',
            value: stats.eventsToday,
            color: '#6366f1'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            ),
            label: 'Events This Week',
            value: stats.eventsThisWeek,
            color: '#8b5cf6'
        }
    ];

    return (
        <div className="dashboard">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">SAC Dashboard</h1>
                    <p className="page-subtitle">Welcome back! Here's your overview of club events</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {statCards.map((stat, index) => (
                    <Link
                        key={index}
                        to={stat.link || '#'}
                        className="stat-card"
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            className="stat-card-icon"
                            style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                        >
                            {stat.icon}
                        </div>
                        <div className="stat-content">
                            <span className="stat-card-value">{stat.value}</span>
                            <span className="stat-card-label">{stat.label}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Alert Banner - Pending Events */}
            {urgentEvents.length > 0 && (
                <div className="alert-banner">
                    <div className="alert-banner-header">
                        <div className="alert-banner-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                            Events Awaiting Your Approval
                        </div>
                        <Link to="/pending" className="btn btn-sm btn-secondary">
                            View All
                        </Link>
                    </div>
                    <ul className="alert-event-list">
                        {urgentEvents.map(event => (
                            <li key={event.id} className="alert-event-item">
                                <div className="alert-event-info">
                                    <span className="alert-event-name">{event.name}</span>
                                    <span className="alert-event-meta">
                                        {event.club} • {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                {event.hasConflict && (
                                    <span className="badge badge-conflict">⚠ Conflict</span>
                                )}
                                <Link to={`/review/${event.id}`} className="btn btn-sm btn-primary">
                                    Review
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Dashboard Grid */}
            <div className="dashboard-grid">
                {/* Upcoming Approved Events */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Upcoming Approved Events</h2>
                        <Link to="/calendar" className="btn btn-ghost btn-sm">View Calendar</Link>
                    </div>
                    <div className="events-list">
                        {approvedEvents.map(event => (
                            <div key={event.id} className="event-item">
                                <div className="event-date-badge">
                                    <span className="event-date-day">
                                        {new Date(event.date).getDate()}
                                    </span>
                                    <span className="event-date-month">
                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                </div>
                                <div className="event-info">
                                    <h3 className="event-name">{event.name}</h3>
                                    <p className="event-meta">
                                        <span>{event.club}</span>
                                        <span className="event-venue">{event.venue}</span>
                                    </p>
                                </div>
                                <span className="badge badge-approved">Approved</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Recent Activity</h2>
                    </div>
                    <div className="activity-list">
                        {recentActivity.map(activity => (
                            <div key={activity.id} className="activity-item">
                                <div className={`activity-icon ${activity.action}`}>
                                    {activity.action === 'approved' ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20,6 9,17 4,12" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    )}
                                </div>
                                <div className="activity-content">
                                    <p className="activity-text">
                                        <span className={`activity-action ${activity.action}`}>
                                            {activity.action === 'approved' ? 'Approved' : 'Rejected'}
                                        </span>
                                        : {activity.eventName}
                                    </p>
                                    <span className="activity-meta">
                                        {activity.clubName} • {activity.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
