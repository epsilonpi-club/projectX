import { Link } from 'react-router-dom';
import { currentUser, registrations } from '../data/mockData';
import './Profile.css';

export default function Profile() {
    const completedEvents = registrations.filter(r => r.status === 'completed');
    const upcomingEvents = registrations.filter(r => r.status === 'upcoming');
    const attendedEvents = completedEvents.filter(r => r.attended);
    const attendancePercentage = completedEvents.length > 0
        ? Math.round((attendedEvents.length / completedEvents.length) * 100)
        : 0;

    return (
        <div className="profile-page">
            <div className="page-header">
                <h1 className="page-title">My Profile</h1>
                <p className="page-subtitle">View your profile information and registration history</p>
            </div>

            {/* Profile Card */}
            <div className="profile-card card">
                <div className="profile-header">
                    <div className="avatar-section">
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="profile-avatar"
                        />
                        <div className="profile-info">
                            <h2 className="profile-name">{currentUser.name}</h2>
                            <p className="profile-email">{currentUser.email}</p>
                        </div>
                    </div>
                </div>

                <div className="profile-details">
                    <div className="detail-item">
                        <span className="detail-label">Roll Number</span>
                        <span className="detail-value">{currentUser.rollNumber}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Department</span>
                        <span className="detail-value">{currentUser.department}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Year</span>
                        <span className="detail-value">{currentUser.year}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="profile-stats-grid">
                <div className="profile-stat-card card">
                    <div className="stat-header">
                        <div className="stat-icon events">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <span className="stat-value">{currentUser.eventsAttended}</span>
                    </div>
                    <span className="stat-label">Events Attended</span>
                </div>

                <div className="profile-stat-card card">
                    <div className="stat-header">
                        <div className="stat-icon upcoming">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12,6 12,12 16,14" />
                            </svg>
                        </div>
                        <span className="stat-value">{upcomingEvents.length}</span>
                    </div>
                    <span className="stat-label">Upcoming Events</span>
                </div>

                <div className="profile-stat-card card">
                    <div className="stat-header">
                        <div className="stat-icon attendance">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                        </div>
                        <span className="stat-value">{attendancePercentage}%</span>
                    </div>
                    <span className="stat-label">Attendance Rate</span>
                </div>
            </div>

            {/* Quick Links */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        My Registrations
                    </h2>
                </div>
                <div className="profile-actions">
                    <Link to="/registrations" className="btn btn-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        View All Registrations
                    </Link>
                    <Link to="/events" className="btn btn-outline">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        Browse Events
                    </Link>
                </div>
            </section>
        </div>
    );
}
