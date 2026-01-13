import { Link } from 'react-router-dom';
import { events, registrations, currentUser } from '../data/mockData';
import EventCard from '../components/EventCard';
import './Dashboard.css';

export default function Dashboard() {
    const featuredEvents = events.filter(e => e.isFeatured).slice(0, 3);
    const upcomingRegistrations = registrations.filter(r => r.status === 'upcoming').slice(0, 3);
    const registeredEventIds = registrations.map(r => r.eventId);

    return (
        <div className="dashboard">
            {/* Welcome Section */}
            <section className="welcome-section">
                <div className="welcome-content">
                    <h1 className="welcome-title">
                        Welcome back, <span className="name-highlight">{currentUser.name.split(' ')[0]}</span> 👋
                    </h1>
                    <p className="welcome-subtitle">
                        Here's what's happening with your campus activities
                    </p>
                </div>
                <div className="quick-actions">
                    <Link to="/events" className="btn btn-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Browse Events
                    </Link>
                    <Link to="/registrations" className="btn btn-outline">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        My Registrations
                    </Link>
                </div>
            </section>

            {/* Stats Cards */}
            <section className="stats-section">
                <div className="stat-card">
                    <div className="stat-icon events">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{currentUser.eventsAttended}</span>
                        <span className="stat-label">Events Attended</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon upcoming">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{upcomingRegistrations.length}</span>
                        <span className="stat-label">Upcoming Events</span>
                    </div>
                </div>
            </section>

            {/* Upcoming Registrations */}
            {upcomingRegistrations.length > 0 && (
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12,6 12,12 16,14" />
                            </svg>
                            Upcoming Registered Events
                        </h2>
                        <Link to="/registrations" className="section-link">
                            View all
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9,18 15,12 9,6" />
                            </svg>
                        </Link>
                    </div>

                    <div className="upcoming-timeline">
                        {upcomingRegistrations.map((reg, index) => (
                            <div key={reg.id} className="timeline-item">
                                <div className="timeline-marker">
                                    <span className="marker-number">{index + 1}</span>
                                </div>
                                <div className="timeline-content card">
                                    <div className="timeline-header">
                                        <span className="badge badge-tech">
                                            {new Date(reg.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                        <span className="timeline-time">{reg.eventTime}</span>
                                    </div>
                                    <h3 className="timeline-title">
                                        <Link to={`/events/${reg.eventId}`}>{reg.eventName}</Link>
                                    </h3>
                                    <p className="timeline-venue">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {reg.venue}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Events To Register*/}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                        </svg>
                        Events To Register
                    </h2>
                    <Link to="/events" className="section-link">
                        View all
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9,18 15,12 9,6" />
                        </svg>
                    </Link>
                </div>

                <div className="events-grid grid grid-3">
                    {featuredEvents.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            isRegistered={registeredEventIds.includes(event.id)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
