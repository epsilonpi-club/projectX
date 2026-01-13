import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { events, registrations } from '../data/mockData';
import { defaultRegistrationForm } from '../data/registrationForms';
import RegistrationForm from '../components/RegistrationForm';
import './EventDetail.css';

export default function EventDetail() {
    const { id } = useParams();
    const event = events.find(e => e.id === id);
    const existingRegistration = registrations.find(r => r.eventId === id);

    const [isRegistered, setIsRegistered] = useState(!!existingRegistration);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    if (!event) {
        return (
            <div className="event-detail">
                <div className="empty-state card">
                    <div className="empty-state-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                    <h3 className="empty-state-title">Event not found</h3>
                    <p className="empty-state-description">
                        The event you're looking for doesn't exist or has been removed.
                    </p>
                    <Link to="/events" className="btn btn-primary">Browse Events</Link>
                </div>
            </div>
        );
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const isClosed = event.seatsAvailable === 0;

    // Use event-specific form or default form
    const formConfig = event.registrationForm || defaultRegistrationForm;

    const handleRegisterClick = () => {
        if (!isRegistered && !isClosed) {
            setShowRegistrationForm(true);
        }
    };

    const handleFormSubmit = (formData) => {
        console.log('Registration submitted:', formData);
        setShowRegistrationForm(false);
        setIsRegistered(true);
        setShowSuccessModal(true);
    };

    const handleFormCancel = () => {
        setShowRegistrationForm(false);
    };

    const categoryColors = {
        Tech: 'badge-tech',
        Cultural: 'badge-cultural',
        Sports: 'badge-sports'
    };

    return (
        <div className="event-detail">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link to="/events">Events</Link>
                <span className="separator">/</span>
                <span className="current">{event.name}</span>
            </nav>

            {/* Banner */}
            <div className="event-banner">
                <img src={event.poster} alt={event.name} />
                <div className="banner-overlay">
                    <span className={`badge badge-lg ${categoryColors[event.category] || 'badge'}`}>
                        {event.category}
                    </span>
                </div>
            </div>

            <div className="event-content-wrapper">
                <div className="event-main">
                    {/* Header */}
                    <div className="event-header">
                        <h1 className="event-name">{event.name}</h1>
                        <div className="event-organizer">
                            <span>Organized by</span>
                            <Link to={`/clubs/${event.clubId}`} className="club-link">
                                {event.clubName}
                            </Link>
                        </div>
                    </div>

                    {/* Description */}
                    <section className="event-section">
                        <h2 className="section-title">About this Event</h2>
                        <p className="event-description">{event.description}</p>
                    </section>

                    {/* Rules */}
                    {event.rules && event.rules.length > 0 && (
                        <section className="event-section">
                            <h2 className="section-title">Rules & Guidelines</h2>
                            <ul className="rules-list">
                                {event.rules.map((rule, index) => (
                                    <li key={index} className="rule-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Eligibility */}
                    {event.eligibility && (
                        <section className="event-section">
                            <h2 className="section-title">Eligibility</h2>
                            <p className="eligibility-text">{event.eligibility}</p>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="event-sidebar">
                    <div className="sidebar-card card">
                        {/* Date & Time */}
                        <div className="info-block">
                            <div className="info-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <span className="info-label">Date & Time</span>
                                <span className="info-value">{formatDate(event.date)}</span>
                                <span className="info-subvalue">{event.time}</span>
                                {event.endDate && (
                                    <span className="info-subvalue">to {formatDate(event.endDate)}</span>
                                )}
                            </div>
                        </div>

                        {/* Venue */}
                        <div className="info-block">
                            <div className="info-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <span className="info-label">Venue</span>
                                <span className="info-value">{event.venue}</span>
                            </div>
                        </div>

                        {/* Seats */}
                        <div className="info-block">
                            <div className="info-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <span className="info-label">Seats Available</span>
                                <span className={`info-value ${isClosed ? 'closed' : ''}`}>
                                    {isClosed ? 'Registration Closed' : `${event.seatsAvailable} / ${event.totalSeats}`}
                                </span>
                                <div className="seats-bar">
                                    <div
                                        className="seats-fill"
                                        style={{ width: `${((event.totalSeats - event.seatsAvailable) / event.totalSeats) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Registration Deadline */}
                        <div className="info-block">
                            <div className="info-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12,6 12,12 16,14" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <span className="info-label">Registration Deadline</span>
                                <span className="info-value">{formatDate(event.registrationDeadline)}</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="cta-section">
                            {isRegistered ? (
                                <button className="btn btn-lg btn-outline btn-registered" disabled>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    Already Registered
                                </button>
                            ) : isClosed ? (
                                <button className="btn btn-lg btn-outline" disabled>
                                    Registration Closed
                                </button>
                            ) : (
                                <button className="btn btn-lg btn-primary btn-register" onClick={handleRegisterClick}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 11l3 3L22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                    </svg>
                                    Register Now
                                </button>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Registration Form Modal */}
            {showRegistrationForm && (
                <RegistrationForm
                    formConfig={formConfig}
                    eventName={event.name}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-icon success">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                        </div>
                        <h2 className="modal-title">Registration Successful!</h2>
                        <p className="modal-description">
                            You have successfully registered for <strong>{event.name}</strong>.
                            Your QR code will be available in My Registrations.
                        </p>

                        <div className="modal-qr">
                            <div className="qr-placeholder-large">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect x="3" y="3" width="7" height="7" rx="1" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" />
                                    <rect x="7" y="7" width="3" height="3" />
                                    <rect x="14" y="7" width="3" height="3" />
                                    <rect x="7" y="14" width="3" height="3" />
                                </svg>
                            </div>
                            <span className="qr-code-text">TECHFEST-2026-STU001</span>
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-outline">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                Add to Calendar
                            </button>
                            <Link to="/registrations" className="btn btn-primary" onClick={() => setShowSuccessModal(false)}>
                                View My Registrations
                            </Link>
                        </div>

                        <button className="modal-close" onClick={() => setShowSuccessModal(false)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
