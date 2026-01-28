import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { events } from '../data/mockData';
import './Events.css';

export default function Events() {
    const [searchParams] = useSearchParams();
    const initialStatus = searchParams.get('status') || 'approved';

    const [activeTab, setActiveTab] = useState(initialStatus);
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'approved', label: 'Approved' },
        { id: 'draft', label: 'Drafts' },
        { id: 'pending', label: 'Pending' },
        { id: 'completed', label: 'Past' }
    ];

    const filteredEvents = useMemo(() => {
        let result = [...events];

        // Status filter
        result = result.filter(e => e.status === activeTab);

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(e =>
                e.name.toLowerCase().includes(query) ||
                e.venue.toLowerCase().includes(query) ||
                e.description.toLowerCase().includes(query)
            );
        }

        // Sort by date
        result.sort((a, b) => new Date(b.date) - new Date(a.date));

        return result;
    }, [activeTab, searchQuery]);

    const getStatusBadge = (status) => {
        const badges = {
            approved: { class: 'badge-approved', label: 'Approved' },
            pending: { class: 'badge-pending', label: 'Pending' },
            draft: { class: 'badge-draft', label: 'Draft' },
            completed: { class: 'badge-completed', label: 'Completed' },
            rejected: { class: 'badge-rejected', label: 'Rejected' }
        };
        return badges[status] || badges.draft;
    };

    // Calculate event progress based on current date vs event date
    const getEventProgress = (event) => {
        const now = new Date();
        const eventDate = new Date(event.date);
        const eventEndDate = event.endDate ? new Date(event.endDate) : eventDate;

        // If event has docs approved, return 100%
        if (event.docsApproved) return 100;

        // If event is in the past
        if (now > eventEndDate) {
            // If docs submitted but not approved, show 80%
            if (event.docsSubmitted) return 80;
            // If marked complete but no docs, show 60%
            if (event.markedComplete) return 60;
            // Event ended but not marked complete, show 50%
            return 50;
        }

        // Event is ongoing
        if (now >= eventDate && now <= eventEndDate) return 40;

        // Event is upcoming - calculate based on time until event
        const createdDate = new Date(event.createdAt);
        const totalDuration = eventDate - createdDate;
        const elapsed = now - createdDate;
        const progress = Math.min((elapsed / totalDuration) * 30, 30); // Max 30% before event
        return Math.max(progress, 10); // Minimum 10%
    };

    const getProgressLabel = (event) => {
        const now = new Date();
        const eventDate = new Date(event.date);
        const eventEndDate = event.endDate ? new Date(event.endDate) : eventDate;

        if (event.docsApproved) return 'Completed';
        if (event.docsSubmitted) return 'Docs Under Review';
        if (event.markedComplete) return 'Submit Docs';
        if (now > eventEndDate) return 'Mark Complete';
        if (now >= eventDate) return 'Ongoing';
        return 'Upcoming';
    };

    return (
        <div className="events-page">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Events</h1>
                    <p className="page-subtitle">Manage your club's events</p>
                </div>
                <Link to="/events/new" className="btn btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Propose Event
                </Link>
            </div>

            {/* Tabs and Search */}
            <div className="events-toolbar card">
                <div className="tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                            <span className="tab-count">
                                {events.filter(e => e.status === tab.id).length}
                            </span>
                        </button>
                    ))}
                </div>
                <div className="search-filter">
                    <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Events List */}
            <div className="events-list">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <Link key={event.id} to={`/events/${event.id}`} className="event-card card">
                            <div className="event-content">
                                <div className="event-header">
                                    <span className={`badge ${getStatusBadge(event.status).class}`}>
                                        {getStatusBadge(event.status).label}
                                    </span>
                                </div>
                                <h3 className="event-title">{event.name}</h3>
                                <p className="event-description">{event.description}</p>
                                <div className="event-meta-row">
                                    <div className="event-participants">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                                        </svg>
                                        <span>{event.registrations || 0} / {event.totalSeats}</span>
                                    </div>
                                    {(event.status === 'approved' || event.status === 'completed') && (
                                        <div className="event-progress-container">
                                            <div className="progress-bar">
                                                <div
                                                    className={`progress-fill ${event.docsApproved ? 'complete' : ''}`}
                                                    style={{ width: `${getEventProgress(event)}%` }}
                                                ></div>
                                            </div>
                                            <span className="progress-label">{getProgressLabel(event)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="event-arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="empty-state card">
                        <div className="empty-state-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <h3 className="empty-state-title">No events found</h3>
                        <p className="empty-state-description">
                            No {activeTab} events yet
                        </p>
                        <Link to="/events/new" className="btn btn-primary">
                            Propose Event
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
