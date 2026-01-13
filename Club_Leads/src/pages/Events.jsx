import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { events } from '../data/mockData';
import './Events.css';

export default function Events() {
    const [searchParams] = useSearchParams();
    const initialStatus = searchParams.get('status') || 'all';

    const [activeTab, setActiveTab] = useState(initialStatus);
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'all', label: 'All Events' },
        { id: 'draft', label: 'Draft' },
        { id: 'pending', label: 'Pending' },
        { id: 'approved', label: 'Approved' },
        { id: 'completed', label: 'Past' }
    ];

    const filteredEvents = useMemo(() => {
        let result = [...events];

        // Status filter
        if (activeTab !== 'all') {
            result = result.filter(e => e.status === activeTab);
        }

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

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
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
                                {tab.id === 'all'
                                    ? events.length
                                    : events.filter(e => e.status === tab.id).length
                                }
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
                            <img src={event.poster} alt={event.name} className="event-poster" />
                            <div className="event-content">
                                <div className="event-header">
                                    <span className={`badge ${getStatusBadge(event.status).class}`}>
                                        {getStatusBadge(event.status).label}
                                    </span>
                                    {event.isPaid && (
                                        <span className="badge badge-paid">₹{event.registrationFee}</span>
                                    )}
                                </div>
                                <h3 className="event-title">{event.name}</h3>
                                <p className="event-description">{event.description}</p>
                                <div className="event-meta-grid">
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
                                        <span>{event.startTime} - {event.endTime}</span>
                                    </div>
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        <span>{event.venue}</span>
                                    </div>
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                                        </svg>
                                        <span>{event.registrations || 0} / {event.totalSeats} registered</span>
                                    </div>
                                </div>
                            </div>
                            <div className="event-actions">
                                {event.status === 'draft' && (
                                    <>
                                        <button className="btn btn-primary btn-sm">Edit</button>
                                        <button className="btn btn-success btn-sm">Submit</button>
                                    </>
                                )}
                                {event.status === 'pending' && (
                                    <span className="pending-text">Awaiting approval...</span>
                                )}
                                {event.status === 'approved' && (
                                    <button className="btn btn-primary btn-sm">Manage</button>
                                )}
                                {event.status === 'completed' && (
                                    <button className="btn btn-outline btn-sm">View Report</button>
                                )}
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
                            {activeTab === 'all'
                                ? 'Start by creating your first event'
                                : `No ${activeTab} events yet`
                            }
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
