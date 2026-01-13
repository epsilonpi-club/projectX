import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { events, registrations } from '../data/mockData';
import './EventDetail.css';

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = events.find(e => e.id === id);
    const eventRegistrations = registrations.filter(r => r.eventId === id);

    const [activeTab, setActiveTab] = useState('overview');

    if (!event) {
        return (
            <div className="event-detail-page">
                <div className="empty-state card">
                    <h3 className="empty-state-title">Event not found</h3>
                    <p className="empty-state-description">The event you're looking for doesn't exist.</p>
                    <Link to="/events" className="btn btn-primary">Back to Events</Link>
                </div>
            </div>
        );
    }

    const getStatusBadge = (status) => {
        const badges = {
            approved: { class: 'badge-approved', label: 'Approved' },
            pending: { class: 'badge-pending', label: 'Pending Approval' },
            draft: { class: 'badge-draft', label: 'Draft' },
            completed: { class: 'badge-completed', label: 'Completed' },
            rejected: { class: 'badge-rejected', label: 'Rejected' }
        };
        return badges[status] || badges.draft;
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Roll Number', 'Email', 'Phone', 'Department', 'Year', 'Status', 'Attended', 'Registered At'];
        const rows = eventRegistrations.map(r => [
            r.name,
            r.rollNumber,
            r.email,
            r.phone,
            r.department,
            r.year,
            r.status,
            r.attended ? 'Yes' : 'No',
            new Date(r.registeredAt).toLocaleString()
        ]);

        const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${event.name.replace(/\s+/g, '_')}_registrations.csv`;
        a.click();
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'registrations', label: `Registrations (${eventRegistrations.length})` },
        { id: 'attendance', label: 'Attendance' }
    ];

    return (
        <div className="event-detail-page">
            <div className="page-header">
                <div className="page-title-section">
                    <button className="btn btn-ghost back-btn" onClick={() => navigate(-1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <div className="title-row">
                            <h1 className="page-title">{event.name}</h1>
                            <span className={`badge ${getStatusBadge(event.status).class}`}>
                                {getStatusBadge(event.status).label}
                            </span>
                        </div>
                        <p className="page-subtitle">Created on {formatDate(event.createdAt)}</p>
                    </div>
                </div>
                <div className="header-actions">
                    {event.status === 'draft' && (
                        <>
                            <button className="btn btn-outline">Edit</button>
                            <button className="btn btn-success">Submit for Approval</button>
                        </>
                    )}
                    {event.status === 'approved' && (
                        <button className="btn btn-primary" onClick={exportToCSV}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Export CSV
                        </button>
                    )}
                </div>
            </div>

            <div className="tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="overview-grid">
                    <div className="event-poster-section card">
                        <img src={event.poster} alt={event.name} className="event-poster" />
                    </div>

                    <div className="event-info-section card">
                        <h3 className="section-title">Event Details</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Date</span>
                                <span className="info-value">{formatDate(event.date)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Time</span>
                                <span className="info-value">{event.startTime} - {event.endTime}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Venue</span>
                                <span className="info-value">{event.venue}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Capacity</span>
                                <span className="info-value">{event.totalSeats} participants</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Registrations</span>
                                <span className="info-value">{event.registrations || 0} / {event.totalSeats}</span>
                            </div>
                            {event.isPaid && (
                                <div className="info-item">
                                    <span className="info-label">Fee</span>
                                    <span className="info-value">₹{event.registrationFee}</span>
                                </div>
                            )}
                        </div>
                        <hr className="divider" />
                        <h3 className="section-title">Description</h3>
                        <p className="event-description">{event.description}</p>

                        {event.hasBudget && (
                            <>
                                <hr className="divider" />
                                <h3 className="section-title">Budget</h3>
                                <div className="budget-info">
                                    <span className="budget-amount">₹{event.budgetAmount?.toLocaleString()}</span>
                                    <p className="budget-description">{event.budgetDescription}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'registrations' && (
                <div className="registrations-section card">
                    <div className="section-header">
                        <h3 className="section-title">Registered Students</h3>
                        <button className="btn btn-outline btn-sm" onClick={exportToCSV}>
                            Export CSV
                        </button>
                    </div>

                    {eventRegistrations.length > 0 ? (
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Roll Number</th>
                                        <th>Department</th>
                                        <th>Registered</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventRegistrations.map(reg => (
                                        <tr key={reg.id}>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar">{reg.name.charAt(0)}</div>
                                                    <div className="student-info">
                                                        <span className="student-name">{reg.name}</span>
                                                        <span className="student-email">{reg.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{reg.rollNumber}</td>
                                            <td>{reg.department}</td>
                                            <td>{new Date(reg.registeredAt).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`badge ${reg.attended ? 'badge-approved' : 'badge-pending'}`}>
                                                    {reg.attended ? 'Attended' : 'Registered'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-message">No registrations yet</div>
                    )}
                </div>
            )}

            {activeTab === 'attendance' && (
                <div className="attendance-section">
                    <div className="attendance-stats card">
                        <div className="stat-item">
                            <span className="stat-value">{eventRegistrations.length}</span>
                            <span className="stat-label">Total Registered</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{eventRegistrations.filter(r => r.attended).length}</span>
                            <span className="stat-label">Attended</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">
                                {eventRegistrations.length > 0
                                    ? Math.round((eventRegistrations.filter(r => r.attended).length / eventRegistrations.length) * 100)
                                    : 0}%
                            </span>
                            <span className="stat-label">Attendance Rate</span>
                        </div>
                    </div>

                    <div className="qr-scanner-section card">
                        <h3 className="section-title">QR Scanner</h3>
                        <p className="scanner-info">Scan student QR codes to mark attendance</p>
                        <button className="btn btn-primary btn-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                            </svg>
                            Open Scanner
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
