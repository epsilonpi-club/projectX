import { useState } from 'react';
import { documents } from '../data/mockData';
import './Documents.css';

export default function Documents() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = documents.filter(doc => {
        const matchesFilter = filter === 'all' || doc.status === filter;
        const matchesSearch = doc.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.documentType.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getDocumentIcon = (type) => {
        if (type.includes('Letter')) {
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            );
        }
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <rect x="8" y="12" width="8" height="6" />
            </svg>
        );
    };

    return (
        <div className="documents-page">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Documents</h1>
                    <p className="page-subtitle">Official documents generated for approved events</p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="filters-bar">
                <div className="search-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'signed' ? 'active' : ''}`}
                        onClick={() => setFilter('signed')}
                    >
                        Signed
                    </button>
                    <button
                        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                </div>
            </div>

            {/* Documents Table */}
            <div className="documents-card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Document Type</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocuments.map(doc => (
                                <tr key={doc.id}>
                                    <td>
                                        <span className="event-name">{doc.eventName}</span>
                                    </td>
                                    <td>
                                        <div className="document-type">
                                            {getDocumentIcon(doc.documentType)}
                                            {doc.documentType}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${doc.status === 'signed' ? 'badge-approved' : 'badge-pending'}`}>
                                            {doc.status === 'signed' ? '✓ Signed' : '⏳ Pending'}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(doc.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn btn-sm btn-ghost">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                                View
                                            </button>
                                            {doc.status === 'signed' && (
                                                <button className="btn btn-sm btn-primary">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                        <polyline points="7,10 12,15 17,10" />
                                                        <line x1="12" y1="15" x2="12" y2="3" />
                                                    </svg>
                                                    PDF
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredDocuments.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                            </svg>
                        </div>
                        <h3 className="empty-state-title">No Documents Found</h3>
                        <p className="empty-state-description">
                            {searchTerm ? 'Try a different search term' : 'No documents match the selected filter'}
                        </p>
                    </div>
                )}
            </div>

            {/* Document Stats */}
            <div className="document-stats">
                <div className="stat-item">
                    <span className="stat-value">{documents.filter(d => d.status === 'signed').length}</span>
                    <span className="stat-label">Signed Documents</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{documents.filter(d => d.status === 'pending').length}</span>
                    <span className="stat-label">Pending Signature</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{documents.length}</span>
                    <span className="stat-label">Total Documents</span>
                </div>
            </div>
        </div>
    );
}
