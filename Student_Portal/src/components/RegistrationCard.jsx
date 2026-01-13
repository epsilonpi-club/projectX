import { Link } from 'react-router-dom';
import './RegistrationCard.css';

export default function RegistrationCard({ registration }) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusBadge = () => {
        switch (registration.status) {
            case 'upcoming':
                return <span className="badge badge-tech">Upcoming</span>;
            case 'completed':
                return <span className="badge badge-success">Completed</span>;
            case 'cancelled':
                return <span className="badge badge-error">Cancelled</span>;
            default:
                return null;
        }
    };

    const getAttendanceBadge = () => {
        if (registration.status !== 'completed') return null;
        return registration.attended
            ? <span className="attendance-badge attended">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
                Attended
            </span>
            : <span className="attendance-badge missed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Missed
            </span>;
    };

    return (
        <div className="registration-card card">
            <div className="registration-content">
                <div className="registration-main">
                    <div className="registration-header">
                        {getStatusBadge()}
                        {getAttendanceBadge()}
                    </div>

                    <h3 className="registration-title">
                        <Link to={`/events/${registration.eventId}`}>
                            {registration.eventName}
                        </Link>
                    </h3>

                    <p className="registration-club">{registration.clubName}</p>

                    <div className="registration-meta">
                        <div className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>{formatDate(registration.eventDate)}</span>
                        </div>
                        <div className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12,6 12,12 16,14" />
                            </svg>
                            <span>{registration.eventTime}</span>
                        </div>
                    </div>

                    <div className="registration-venue">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{registration.venue}</span>
                    </div>
                </div>

                <div className="registration-qr">
                    <div className="qr-placeholder">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                    </div>
                    <span className="qr-label">View QR</span>
                </div>
            </div>

            <div className="registration-footer">
                <span className="registered-date">
                    Registered on {formatDate(registration.registeredOn)}
                </span>
                {registration.certificate && (
                    <button className="btn btn-sm btn-outline">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7,10 12,15 17,10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Certificate
                    </button>
                )}
            </div>
        </div>
    );
}
