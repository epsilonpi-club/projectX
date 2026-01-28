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
    const [showDocModal, setShowDocModal] = useState(false);
    const [uploadedDocs, setUploadedDocs] = useState({});
    const [isMarkedComplete, setIsMarkedComplete] = useState(event?.markedComplete || false);
    const [docsSubmitted, setDocsSubmitted] = useState(event?.docsSubmitted || false);
    const [docsApproved] = useState(event?.docsApproved || false);

    const documentTypes = [
        { id: 'conduct_letter', name: 'Conduct Letter', required: true },
        { id: 'budget_letter', name: 'Budget Letter', required: true },
        { id: 'ledger', name: 'Ledger', required: true },
        { id: 'circular', name: 'Circular', required: true },
        { id: 'poster', name: 'Poster', required: true },
        { id: 'event_report', name: 'Event Report', required: true },
        { id: 'attendance_letters', name: 'Attendance Letters', required: true },
        { id: 'team_permission', name: 'Team Permission Letters', required: true },
        { id: 'certificates', name: 'Certificates', required: false },
        { id: 'invitation_letters', name: 'Invitation Letters/Mails', required: false }
    ];

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

    // Check if event date has passed
    const now = new Date();
    const eventDate = new Date(event.date);
    const eventEndDate = event.endDate ? new Date(event.endDate) : eventDate;
    const isEventPast = now > eventEndDate;

    // Determine if event is in view-only mode (docs approved by SAC)
    const isViewOnly = docsApproved;

    // Determine current event stage
    const canMarkComplete = event.status === 'approved' && isEventPast && !isMarkedComplete;
    const canSubmitDocs = isMarkedComplete && !docsSubmitted;
    const awaitingApproval = docsSubmitted && !docsApproved;

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

    const handleFileUpload = (docId, e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedDocs(prev => ({
                ...prev,
                [docId]: file.name
            }));
        }
    };

    const handleMarkComplete = () => {
        setIsMarkedComplete(true);
        // In real app, this would update the backend
    };

    const handleSubmitDocs = () => {
        setDocsSubmitted(true);
        setShowDocModal(false);
        // In real app, this would submit docs to SAC for approval
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'registrations', label: `Registrations (${eventRegistrations.length})` },
        { id: 'attendance', label: 'Attendance' }
    ];

    return (
        <div className={`event-detail-page ${isViewOnly ? 'view-only' : ''}`}>
            {isViewOnly && (
                <div className="view-only-banner">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span>This event is complete. View-only mode.</span>
                </div>
            )}

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
                            <span className={`badge ${getStatusBadge(isViewOnly ? 'completed' : event.status).class}`}>
                                {isViewOnly ? 'Completed' : getStatusBadge(event.status).label}
                            </span>
                            {awaitingApproval && (
                                <span className="badge badge-pending">Docs Under Review</span>
                            )}
                        </div>
                        <p className="page-subtitle">Created on {formatDate(event.createdAt)}</p>
                    </div>
                </div>
                <div className="header-actions">
                    {event.status === 'draft' && !isViewOnly && (
                        <button className="btn btn-primary" onClick={() => navigate(`/events/${event.id}/edit`)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit Event
                        </button>
                    )}
                    {event.status === 'approved' && !isViewOnly && (
                        <>
                            {canMarkComplete && (
                                <button className="btn btn-warning" onClick={handleMarkComplete}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Mark Event Complete
                                </button>
                            )}
                            {canSubmitDocs && (
                                <button className="btn btn-success" onClick={() => setShowDocModal(true)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="12" y1="18" x2="12" y2="12" />
                                        <line x1="9" y1="15" x2="15" y2="15" />
                                    </svg>
                                    Submit Documentation
                                </button>
                            )}
                            {!canMarkComplete && !canSubmitDocs && !awaitingApproval && (
                                <button className="btn btn-primary" onClick={exportToCSV}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Export CSV
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Progress indicator for approved events */}
            {(event.status === 'approved' || event.status === 'completed') && (
                <div className="event-progress-timeline">
                    <div className={`timeline-step ${true ? 'complete' : ''}`}>
                        <div className="timeline-dot"></div>
                        <span>Event Approved</span>
                    </div>
                    <div className={`timeline-step ${isEventPast ? 'complete' : 'current'}`}>
                        <div className="timeline-dot"></div>
                        <span>Event Day</span>
                    </div>
                    <div className={`timeline-step ${isMarkedComplete ? 'complete' : isEventPast ? 'current' : ''}`}>
                        <div className="timeline-dot"></div>
                        <span>Mark Complete</span>
                    </div>
                    <div className={`timeline-step ${docsSubmitted ? 'complete' : isMarkedComplete ? 'current' : ''}`}>
                        <div className="timeline-dot"></div>
                        <span>Submit Docs</span>
                    </div>
                    <div className={`timeline-step ${docsApproved ? 'complete' : docsSubmitted ? 'current' : ''}`}>
                        <div className="timeline-dot"></div>
                        <span>SAC Approved</span>
                    </div>
                </div>
            )}

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
                    <div className="event-info-section card full-width">
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
                        {!isViewOnly && (
                            <button className="btn btn-outline btn-sm" onClick={exportToCSV}>
                                Export CSV
                            </button>
                        )}
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

                    {!isViewOnly && (
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
                    )}
                </div>
            )}

            {/* Documentation Modal */}
            {showDocModal && (
                <div className="modal-overlay" onClick={() => setShowDocModal(false)}>
                    <div className="modal doc-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {event.status === 'draft' ? 'Add Documentation' : 'Submit Event Documentation'}
                            </h2>
                            <button className="modal-close" onClick={() => setShowDocModal(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="modal-description">
                                {event.status === 'draft'
                                    ? 'Upload the required documents for event approval'
                                    : 'Upload post-event documentation for SAC review'
                                }
                            </p>
                            <div className="doc-list">
                                {documentTypes.map(doc => (
                                    <div key={doc.id} className={`doc-item ${uploadedDocs[doc.id] ? 'uploaded' : ''}`}>
                                        <div className="doc-info">
                                            <div className="doc-details">
                                                <span className="doc-name">
                                                    {doc.name}
                                                    {doc.required && <span className="required-badge">Required</span>}
                                                    {!doc.required && <span className="optional-badge">If applicable</span>}
                                                </span>
                                                {uploadedDocs[doc.id] && (
                                                    <span className="doc-file">{uploadedDocs[doc.id]}</span>
                                                )}
                                            </div>
                                        </div>
                                        <label className={`btn ${uploadedDocs[doc.id] ? 'btn-success' : 'btn-outline'} btn-sm`}>
                                            {uploadedDocs[doc.id] ? (
                                                <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                    Uploaded
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                        <polyline points="17 8 12 3 7 8" />
                                                        <line x1="12" y1="3" x2="12" y2="15" />
                                                    </svg>
                                                    Upload
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                className="file-input-hidden"
                                                onChange={(e) => handleFileUpload(doc.id, e)}
                                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                            />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={() => setShowDocModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSubmitDocs}>
                                {event.status === 'draft' ? 'Submit for Approval' : 'Submit to SAC'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
