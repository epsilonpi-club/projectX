import { useParams, Link } from 'react-router-dom';
import { clubs, events } from '../data/mockData';
import EventCard from '../components/EventCard';
import './ClubDetail.css';

export default function ClubDetail() {
    const { id } = useParams();
    const club = clubs.find(c => c.id === id);
    const clubEvents = events.filter(e => e.clubId === id);

    if (!club) {
        return (
            <div className="club-detail">
                <div className="empty-state card">
                    <div className="empty-state-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                    <h3 className="empty-state-title">Club not found</h3>
                    <p className="empty-state-description">
                        The club you're looking for doesn't exist or has been removed.
                    </p>
                    <Link to="/clubs" className="btn btn-primary">Browse Clubs</Link>
                </div>
            </div>
        );
    }

    const categoryColors = {
        Technical: 'badge-tech',
        Cultural: 'badge-cultural',
        Sports: 'badge-sports',
        Literary: 'badge-tech',
        Creative: 'badge-cultural'
    };

    return (
        <div className="club-detail">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link to="/clubs">Clubs</Link>
                <span className="separator">/</span>
                <span className="current">{club.name}</span>
            </nav>

            {/* Club Header */}
            <div className="club-header card">
                <div className="club-info">
                    <div className="club-logo-large">
                        <img src={club.logo} alt={club.name} />
                    </div>
                    <div className="club-details">
                        <span className={`badge ${categoryColors[club.category] || 'badge'}`}>
                            {club.category}
                        </span>
                        <h1 className="club-name">{club.name}</h1>
                        <p className="club-description">{club.description}</p>

                        <div className="club-stats">
                            <div className="stat">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                <span>{club.members} members</span>
                            </div>
                            <div className="stat">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <span>{clubEvents.length} events</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-info">
                    <h3 className="contact-title">Contact</h3>
                    <div className="contact-items">
                        <a href={`mailto:${club.email}`} className="contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            {club.email}
                        </a>
                        <a href={`https://instagram.com/${club.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            {club.instagram}
                        </a>
                    </div>
                </div>
            </div>

            {/* Club Events */}
            <section className="club-events-section">
                <h2 className="section-title">Events by {club.name}</h2>

                {clubEvents.length > 0 ? (
                    <div className="events-grid grid grid-3">
                        {clubEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state card">
                        <div className="empty-state-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <h3 className="empty-state-title">No events yet</h3>
                        <p className="empty-state-description">
                            This club hasn't organized any events yet. Check back soon!
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
