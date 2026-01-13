import { Link } from 'react-router-dom';
import { currentClub, events, registrations, clubMembers } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
    const approvedEvents = events.filter(e => e.status === 'approved');
    const pendingEvents = events.filter(e => e.status === 'pending');
    const draftEvents = events.filter(e => e.status === 'draft');

    const upcomingEvents = events
        .filter(e => e.status === 'approved' && new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    const recentRegistrations = registrations
        .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt))
        .slice(0, 5);

    const stats = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            ),
            label: 'Total Events',
            value: currentClub.eventsHosted,
            color: '#6366f1'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
            ),
            label: 'Total Registrations',
            value: currentClub.totalRegistrations.toLocaleString(),
            color: '#10b981'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                </svg>
            ),
            label: 'Pending Approval',
            value: pendingEvents.length,
            color: '#f59e0b'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            ),
            label: 'Club Members',
            value: clubMembers.length,
            color: '#8b5cf6'
        }
    ];

    const getStatusBadge = (status) => {
        const badges = {
            approved: 'badge-approved',
            pending: 'badge-pending',
            draft: 'badge-draft',
            completed: 'badge-completed'
        };
        return badges[status] || 'badge-draft';
    };

    return (
        <div className="dashboard">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Welcome back! Here's what's happening with {currentClub.name}</p>
                </div>
                <Link to="/events/new" className="btn btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Propose Event
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-card-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-content">
                            <span className="stat-card-value">{stat.value}</span>
                            <span className="stat-card-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                {/* Upcoming Events */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Upcoming Events</h2>
                        <Link to="/events" className="btn btn-ghost btn-sm">View all</Link>
                    </div>
                    <div className="events-list">
                        {upcomingEvents.length > 0 ? (
                            upcomingEvents.map(event => (
                                <Link key={event.id} to={`/events/${event.id}`} className="event-item">
                                    <img src={event.poster} alt={event.name} className="event-thumb" />
                                    <div className="event-info">
                                        <h3 className="event-name">{event.name}</h3>
                                        <p className="event-meta">
                                            <span className="event-date">
                                                {new Date(event.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <span className="event-venue">{event.venue}</span>
                                        </p>
                                    </div>
                                    <div className="event-stats">
                                        <span className="registrations-count">{event.registrations}</span>
                                        <span className="registrations-label">registrations</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="empty-message">No upcoming events</div>
                        )}
                    </div>
                </div>

                {/* Event Status Summary */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Events by Status</h2>
                    </div>
                    <div className="status-list">
                        <Link to="/events?status=draft" className="status-item">
                            <div className="status-info">
                                <span className={`badge badge-draft`}>Draft</span>
                                <span className="status-description">Events being prepared</span>
                            </div>
                            <span className="status-count">{draftEvents.length}</span>
                        </Link>
                        <Link to="/events?status=pending" className="status-item">
                            <div className="status-info">
                                <span className={`badge badge-pending`}>Pending</span>
                                <span className="status-description">Awaiting SAC approval</span>
                            </div>
                            <span className="status-count">{pendingEvents.length}</span>
                        </Link>
                        <Link to="/events?status=approved" className="status-item">
                            <div className="status-info">
                                <span className={`badge badge-approved`}>Approved</span>
                                <span className="status-description">Ready for registrations</span>
                            </div>
                            <span className="status-count">{approvedEvents.length}</span>
                        </Link>
                    </div>
                </div>

                {/* Recent Registrations */}
                <div className="dashboard-card full-width">
                    <div className="card-header">
                        <h2 className="card-title">Recent Registrations</h2>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Event</th>
                                    <th>Registered</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRegistrations.map(reg => {
                                    const event = events.find(e => e.id === reg.eventId);
                                    return (
                                        <tr key={reg.id}>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar">
                                                        {reg.name.charAt(0)}
                                                    </div>
                                                    <div className="student-info">
                                                        <span className="student-name">{reg.name}</span>
                                                        <span className="student-roll">{reg.rollNumber}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{event?.name || 'Unknown Event'}</td>
                                            <td>{new Date(reg.registeredAt).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`badge ${reg.attended ? 'badge-approved' : 'badge-pending'}`}>
                                                    {reg.attended ? 'Attended' : 'Registered'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
