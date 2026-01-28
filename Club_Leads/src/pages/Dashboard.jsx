import { Link } from 'react-router-dom';
import { currentClub, clubMembers, events, notifications } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
    // Get the club lead
    const clubLead = clubMembers.find(member => member.role === 'lead');
    const totalMembers = clubMembers.length;

    // Recent activity - combine events and notifications for SAC activity
    const recentActivity = [
        ...events.filter(e => e.status === 'approved' || e.status === 'pending').map(e => ({
            id: e.id,
            type: e.status === 'approved' ? 'approved' : 'pending',
            title: e.status === 'approved' ? 'Event Approved' : 'Pending Review',
            description: e.name,
            date: e.approvedAt || e.createdAt,
            icon: e.status === 'approved' ? '✅' : '⏳'
        })),
        ...notifications.filter(n => n.type === 'approval' || n.type === 'pending').map(n => ({
            id: n.id,
            type: n.type,
            title: n.title,
            description: n.message,
            date: n.createdAt,
            icon: n.type === 'approval' ? '✅' : '⏳'
        }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="dashboard">
            {/* Hero Welcome Section */}
            <div className="welcome-hero">
                <div className="welcome-content">
                    <span className="welcome-label">Welcome back</span>
                    <h1 className="welcome-name">{clubLead?.name || 'Club Lead'}</h1>
                    <p className="welcome-club">{currentClub.name}</p>
                </div>
                <div className="welcome-decoration">
                    <div className="welcome-circle welcome-circle-1"></div>
                    <div className="welcome-circle welcome-circle-2"></div>
                    <div className="welcome-circle welcome-circle-3"></div>
                </div>
            </div>

            {/* Stats & Action Cards */}
            <div className="dashboard-cards">
                {/* Total Members Card */}
                <div className="info-card members-card">
                    <div className="info-card-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                    </div>
                    <div className="info-card-content">
                        <span className="info-card-value">{totalMembers}</span>
                        <span className="info-card-label">Total Members</span>
                    </div>
                </div>

                {/* Propose Event Card */}
                <Link to="/events/new" className="info-card propose-card">
                    <div className="info-card-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </div>
                    <div className="info-card-content">
                        <span className="info-card-action">Propose a</span>
                        <span className="info-card-label-bold">New Event</span>
                    </div>
                    <div className="propose-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </div>
                </Link>
            </div>

            {/* Recent Activity at SAC Section */}
            <div className="recent-activity-section">
                <h2 className="section-title">Recent Activity at SAC</h2>
                <div className="activity-scroll-container">
                    <div className="activity-list">
                        {recentActivity.map(activity => (
                            <div key={activity.id} className={`activity-item activity-${activity.type}`}>
                                <div className="activity-icon">{activity.icon}</div>
                                <div className="activity-content">
                                    <span className="activity-title">{activity.title}</span>
                                    <span className="activity-description">{activity.description}</span>
                                </div>
                                <span className="activity-date">{formatDate(activity.date)}</span>
                            </div>
                        ))}
                        {recentActivity.length === 0 && (
                            <div className="activity-empty">No recent activity</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
