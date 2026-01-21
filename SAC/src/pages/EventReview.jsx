import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { pendingEvents, calendarEvents } from '../data/mockData';
import './EventReview.css';

export default function EventReview() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [remarks, setRemarks] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionType, setActionType] = useState(null);

    const event = pendingEvents.find(e => e.id === parseInt(eventId));

    if (!event) {
        return (
            <div className="event-review">
                <div className="empty-state">
                    <h3 className="empty-state-title">Event Not Found</h3>
                    <p className="empty-state-description">The event you're looking for doesn't exist.</p>
                    <Link to="/pending" className="btn btn-primary">Back to Pending Requests</Link>
                </div>
            </div>
        );
    }

    // Get current month calendar data
    const eventDate = new Date(event.date);
    const currentMonth = eventDate.getMonth();
    const currentYear = eventDate.getFullYear();

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    // Get events for this month
    const monthEvents = calendarEvents.filter(e => {
        const eDate = new Date(e.date);
        return eDate.getMonth() === currentMonth && eDate.getFullYear() === currentYear;
    });

    const handleAction = (type) => {
        setActionType(type);
        setShowConfirmModal(true);
    };

    const confirmAction = () => {
        // In real app, this would call API
        alert(`Event ${actionType === 'approve' ? 'approved' : 'rejected'} successfully!`);
        setShowConfirmModal(false);
        navigate('/pending');
    };

    return (
        <div className="event-review">
            <div className="review-header">
                <Link to="/pending" className="back-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                    Back to Pending Requests
                </Link>
            </div>

            {/* Event Title Card */}
            <div className="event-title-card">
                <div className="event-title-content">
                    <div className="event-category-badge">{event.category}</div>
                    <h1 className="event-title">{event.name}</h1>
                    <p className="event-submitted">
                        Submitted by: {event.club} • {new Date(event.submittedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                </div>
                <span className="badge badge-pending badge-lg">Pending Review</span>
            </div>

            <div className="review-grid">
                {/* Left Column - Event Details */}
                <div className="review-section">
                    <div className="section-card">
                        <h2 className="section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                            </svg>
                            Event Details
                        </h2>

                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Date</span>
                                <span className="detail-value">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Time</span>
                                <span className="detail-value">{event.time}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Venue</span>
                                <span className="detail-value">{event.venue}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Expected Participants</span>
                                <span className="detail-value">{event.expectedParticipants.toLocaleString()}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Budget</span>
                                <span className="detail-value">₹{event.budget.toLocaleString()}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Category</span>
                                <span className="detail-value">{event.category}</span>
                            </div>
                        </div>

                        <div className="description-section">
                            <h3 className="subsection-title">Description</h3>
                            <p className="description-text">{event.description}</p>
                        </div>

                        <div className="attachments-section">
                            <h3 className="subsection-title">Attached Documents</h3>
                            <div className="attachments-list">
                                {event.attachments.map((attachment, index) => (
                                    <a key={index} href="#" className="attachment-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                            <polyline points="14,2 14,8 20,8" />
                                        </svg>
                                        {attachment.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Conflict Check & Calendar */}
                <div className="review-section">
                    <div className="section-card">
                        <h2 className="section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Date & Venue Conflict Check
                        </h2>

                        {/* Conflict Alert */}
                        {event.hasConflict && (
                            <div className="conflict-alert">
                                <div className="conflict-alert-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                        <line x1="12" y1="9" x2="12" y2="13" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                    </svg>
                                </div>
                                <div className="conflict-alert-content">
                                    <span className="conflict-alert-title">Conflict Detected</span>
                                    <span className="conflict-alert-text">
                                        "{event.conflictEvent}" is already booked at {event.venue} on this date.
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Mini Calendar */}
                        <div className="mini-calendar">
                            <div className="calendar-header">
                                <span className="calendar-month">
                                    {eventDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="calendar-grid">
                                <div className="calendar-weekdays">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="weekday">{day}</div>
                                    ))}
                                </div>
                                <div className="calendar-days">
                                    {/* Empty cells for days before month starts */}
                                    {[...Array(firstDay)].map((_, i) => (
                                        <div key={`empty-${i}`} className="calendar-day empty"></div>
                                    ))}
                                    {/* Days of the month */}
                                    {[...Array(daysInMonth)].map((_, i) => {
                                        const day = i + 1;
                                        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                        const hasEvent = monthEvents.some(e => e.date === dateStr);
                                        const isRequestedDate = day === eventDate.getDate();

                                        return (
                                            <div
                                                key={day}
                                                className={`calendar-day ${isRequestedDate ? 'requested' : ''} ${hasEvent && !isRequestedDate ? 'has-event' : ''}`}
                                            >
                                                {day}
                                                {hasEvent && !isRequestedDate && <span className="event-dot"></span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="calendar-legend">
                                <div className="legend-item">
                                    <span className="legend-dot requested"></span>
                                    Requested Date
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot has-event"></span>
                                    Existing Events
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Remarks Section */}
            <div className="remarks-section">
                <div className="section-card">
                    <h2 className="section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Remarks / Feedback
                    </h2>
                    <textarea
                        className="textarea"
                        placeholder="Enter your feedback or conditions for approval..."
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        rows={4}
                    ></textarea>
                </div>
            </div>

            {/* Action Section */}
            <div className="action-section">
                <div className="section-card">
                    <div className="signature-notice">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        <div className="signature-notice-content">
                            <span className="signature-notice-title">Digital Signature Notice</span>
                            <span className="signature-notice-text">
                                By clicking "Approve", you digitally authorize this event. Your approval serves as an official digital signature on all related documents.
                            </span>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="btn btn-lg btn-outline-danger"
                            onClick={() => handleAction('reject')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            Reject Event
                        </button>
                        <button
                            className="btn btn-lg btn-success"
                            onClick={() => handleAction('approve')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20,6 9,17 4,12" />
                            </svg>
                            Approve Event
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                            </h3>
                        </div>
                        <div className="modal-body">
                            <p>
                                Are you sure you want to <strong>{actionType}</strong> the event "{event.name}"?
                            </p>
                            {actionType === 'approve' && (
                                <p className="modal-note">
                                    This will generate official approval documents with your digital signature.
                                </p>
                            )}
                            {actionType === 'reject' && !remarks && (
                                <p className="modal-warning">
                                    ⚠️ Consider adding remarks to explain the rejection reason.
                                </p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`btn ${actionType === 'approve' ? 'btn-success' : 'btn-danger'}`}
                                onClick={confirmAction}
                            >
                                Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
