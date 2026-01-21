import { Link } from 'react-router-dom';
import { pendingEvents } from '../data/mockData';
import './PendingRequests.css';

export default function PendingRequests() {
    return (
        <div className="pending-requests">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Pending Event Requests</h1>
                    <p className="page-subtitle">{pendingEvents.length} events awaiting your approval</p>
                </div>
            </div>

            <div className="requests-card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Club</th>
                                <th>Date</th>
                                <th>Venue</th>
                                <th>Expected Attendees</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingEvents.map(event => (
                                <tr key={event.id}>
                                    <td>
                                        <div className="event-cell">
                                            <span className="event-cell-name">{event.name}</span>
                                            {event.hasConflict && (
                                                <span className="conflict-indicator">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                                        <line x1="12" y1="9" x2="12" y2="13" />
                                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                                    </svg>
                                                    Conflict
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>{event.club}</td>
                                    <td>
                                        {new Date(event.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td>{event.venue}</td>
                                    <td>{event.expectedParticipants.toLocaleString()}</td>
                                    <td>
                                        <span className="badge badge-pending">Pending</span>
                                    </td>
                                    <td>
                                        <Link to={`/review/${event.id}`} className="btn btn-sm btn-primary">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {pendingEvents.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <polyline points="22,4 12,14.01 9,11.01" />
                            </svg>
                        </div>
                        <h3 className="empty-state-title">All Caught Up!</h3>
                        <p className="empty-state-description">
                            No pending event requests at the moment. Check back later.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
