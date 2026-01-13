import { Link } from 'react-router-dom';
import './EventCard.css';

const categoryColors = {
    Tech: 'badge-tech',
    Cultural: 'badge-cultural',
    Sports: 'badge-sports',
    Literary: 'badge-tech',
    Creative: 'badge-cultural'
};

export default function EventCard({ event, isRegistered = false }) {
    const seatsPercentage = (event.seatsAvailable / event.totalSeats) * 100;
    const isAlmostFull = seatsPercentage <= 20 && seatsPercentage > 0;
    const isClosed = event.seatsAvailable === 0;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="event-card card">
            <Link to={`/events/${event.id}`} className="event-card-link">
                <div className="event-poster">
                    <img src={event.poster} alt={event.name} loading="lazy" />
                    {event.isFeatured && (
                        <span className="featured-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                            </svg>
                            Featured
                        </span>
                    )}
                    <span className={`category-badge ${categoryColors[event.category] || 'badge'}`}>
                        {event.category}
                    </span>
                </div>

                <div className="event-content">
                    <h3 className="event-title">{event.name}</h3>
                    <p className="event-club">{event.clubName}</p>

                    <div className="event-meta">
                        <div className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12,6 12,12 16,14" />
                            </svg>
                            <span>{event.time}</span>
                        </div>
                    </div>

                    <div className="event-venue">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{event.venue}</span>
                    </div>

                    <div className="event-footer">
                        <div className={`seats-info ${isAlmostFull ? 'warning' : ''} ${isClosed ? 'closed' : ''}`}>
                            {isClosed ? (
                                <span className="seats-closed">Registration Closed</span>
                            ) : (
                                <>
                                    <span className="seats-count">{event.seatsAvailable}</span>
                                    <span className="seats-label">seats left</span>
                                </>
                            )}
                        </div>

                        {isRegistered ? (
                            <span className="btn btn-outline btn-sm btn-disabled">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Registered
                            </span>
                        ) : isClosed ? (
                            <span className="btn btn-outline btn-sm btn-disabled">Closed</span>
                        ) : (
                            <span className="btn btn-primary btn-sm">Register</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
