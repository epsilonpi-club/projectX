import { useState } from 'react';
import { clubMembers } from '../data/mockData';
import './Members.css';

export default function Members() {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredMembers = clubMembers.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = !roleFilter || member.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (role) => {
        const badges = {
            lead: { class: 'role-lead', label: 'Club Lead' },
            member: { class: 'role-member', label: 'Member' },
            scanner: { class: 'role-scanner', label: 'Scanner' }
        };
        return badges[role] || badges.member;
    };

    return (
        <div className="members-page">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Club Members</h1>
                    <p className="page-subtitle">Manage your club's team members and their roles</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Member
                </button>
            </div>

            <div className="members-toolbar card">
                <div className="search-filter">
                    <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="role-filter">
                    <select
                        className="select"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="lead">Club Leads</option>
                        <option value="member">Members</option>
                        <option value="scanner">Scanners</option>
                    </select>
                </div>
            </div>

            <div className="members-grid">
                {filteredMembers.map(member => (
                    <div key={member.id} className="member-card card">
                        <div className="member-header">
                            <img src={member.avatar} alt={member.name} className="member-avatar" />
                            <span className={`role-badge ${getRoleBadge(member.role).class}`}>
                                {getRoleBadge(member.role).label}
                            </span>
                        </div>
                        <div className="member-info">
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-roll">{member.rollNumber}</p>
                            <p className="member-email">{member.email}</p>
                        </div>
                        <div className="member-meta">
                            <span className="joined-date">
                                Joined {new Date(member.joinedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="member-actions">
                            <button className="btn btn-ghost btn-sm">Edit Role</button>
                            {member.role !== 'lead' && (
                                <button className="btn btn-ghost btn-sm text-danger">Remove</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredMembers.length === 0 && (
                <div className="empty-state card">
                    <div className="empty-state-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                    </div>
                    <h3 className="empty-state-title">No members found</h3>
                    <p className="empty-state-description">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            )}

            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Add New Member</h3>
                            <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Email or Roll Number</label>
                                <input type="text" className="input" placeholder="Enter email or roll number" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <select className="select">
                                    <option value="member">Member</option>
                                    <option value="scanner">Scanner (QR Access)</option>
                                    <option value="lead">Club Lead</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary">Add Member</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
