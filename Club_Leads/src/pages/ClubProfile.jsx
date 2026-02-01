import { useState } from 'react';
import { currentClub, clubMembers } from '../data/mockData';
import './ClubProfile.css';

export default function ClubProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [members, setMembers] = useState(clubMembers);
    const [formData, setFormData] = useState({
        description: currentClub.description,
        facultyName: currentClub.facultyAdvisor.name,
        facultyDept: currentClub.facultyAdvisor.department,
        facultyEmail: currentClub.facultyAdvisor.email,
        email: currentClub.email,
        instagram: currentClub.instagram,
        website: currentClub.website || '',
    });
    const [newMember, setNewMember] = useState({ emailOrRoll: '', role: 'member' });

    const leads = members.filter(m => m.role === 'lead');
    const regularMembers = members.filter(m => m.role !== 'lead');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (memberId, newRole) => {
        setMembers(prev => prev.map(m =>
            m.id === memberId ? { ...m, role: newRole } : m
        ));
    };

    const handleRemoveMember = (memberId) => {
        setMembers(prev => prev.filter(m => m.id !== memberId));
    };

    const handleAddMember = () => {
        if (!newMember.emailOrRoll.trim()) return;

        const newMemberData = {
            id: `USR${Date.now()}`,
            name: newMember.emailOrRoll.includes('@') ? newMember.emailOrRoll.split('@')[0] : 'New Member',
            email: newMember.emailOrRoll.includes('@') ? newMember.emailOrRoll : `${newMember.emailOrRoll}@college.edu`,
            rollNumber: newMember.emailOrRoll.includes('@') ? 'NEW001' : newMember.emailOrRoll,
            role: newMember.role,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
            joinedAt: new Date().toISOString().split('T')[0]
        };

        setMembers(prev => [...prev, newMemberData]);
        setNewMember({ emailOrRoll: '', role: 'member' });
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const getRoleBadge = (role) => {
        const badges = {
            lead: { class: 'role-lead', label: 'Club Lead' },
            member: { class: 'role-member', label: 'Member' },
            scanner: { class: 'role-scanner', label: 'Scanner' }
        };
        return badges[role] || badges.member;
    };

    return (
        <div className="club-profile-page">
            {/* Hero Section */}
            <div className="profile-hero">
                <div className="hero-content">
                    <img src={currentClub.logo} alt={currentClub.name} className="club-logo-large" />
                    <h1 className="club-name-large">{currentClub.name}</h1>
                </div>
                <button className="btn edit-profile-btn" onClick={() => setIsEditing(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Profile
                </button>
            </div>

            {/* Faculty Coordinator */}
            <div className="profile-section faculty-section">
                <h2 className="section-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Faculty Coordinator
                </h2>
                <div className="faculty-card">
                    <div className="faculty-avatar">
                        {currentClub.facultyAdvisor.name.charAt(0)}
                    </div>
                    <div className="faculty-info">
                        <h4 className="faculty-name">{currentClub.facultyAdvisor.name}</h4>
                        <p className="faculty-dept">{currentClub.facultyAdvisor.department}</p>
                        <p className="faculty-email">{currentClub.facultyAdvisor.email}</p>
                    </div>
                </div>
            </div>

            {/* About & Socials */}
            <div className="profile-section about-section">
                <h2 className="section-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    About
                </h2>
                <p className="about-text">{formData.description}</p>

                <div className="socials-container">
                    <h4 className="socials-title">Connect with us</h4>
                    <div className="social-links">
                        <a href={`mailto:${currentClub.email}`} className="social-link email">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            {currentClub.email}
                        </a>
                        <a href={`https://instagram.com/${currentClub.instagram.replace('@', '')}`} className="social-link instagram" target="_blank" rel="noopener noreferrer">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            {currentClub.instagram}
                        </a>
                        {currentClub.website && (
                            <a href={currentClub.website} className="social-link website" target="_blank" rel="noopener noreferrer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                                </svg>
                                Website
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Club Leads - Card Grid */}
            <div className="profile-section">
                <div className="section-header">
                    <h2 className="section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Club Leads
                    </h2>
                </div>

                <div className="people-grid">
                    {leads.map(lead => (
                        <div key={lead.id} className="person-card">
                            <img src={lead.avatar} alt={lead.name} className="person-avatar" />
                            <h4 className="person-name">{lead.name}</h4>
                            <span className={`role-badge ${getRoleBadge(lead.role).class}`}>
                                {getRoleBadge(lead.role).label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Members - Card Grid */}
            <div className="profile-section">
                <div className="section-header">
                    <h2 className="section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                        Members ({regularMembers.length})
                    </h2>
                </div>

                <div className="people-grid">
                    {regularMembers.map(member => (
                        <div key={member.id} className="person-card">
                            <img src={member.avatar} alt={member.name} className="person-avatar" />
                            <h4 className="person-name">{member.name}</h4>
                            <span className={`role-badge ${getRoleBadge(member.role).class}`}>
                                {getRoleBadge(member.role).label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="modal-overlay" onClick={() => setIsEditing(false)}>
                    <div className="modal edit-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Edit Club Profile</h3>
                            <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">About</label>
                                <textarea
                                    name="description"
                                    className="textarea"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write about your club..."
                                />
                            </div>

                            {/* Faculty Coordinator */}
                            <div className="form-group">
                                <label className="form-label">Faculty Coordinator</label>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        name="facultyName"
                                        className="input"
                                        placeholder="Name"
                                        value={formData.facultyName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-row" style={{ marginTop: '0.5rem' }}>
                                    <input
                                        type="text"
                                        name="facultyDept"
                                        className="input"
                                        placeholder="Department"
                                        value={formData.facultyDept}
                                        onChange={handleChange}
                                        style={{ flex: 1 }}
                                    />
                                    <input
                                        type="email"
                                        name="facultyEmail"
                                        className="input"
                                        placeholder="Email"
                                        value={formData.facultyEmail}
                                        onChange={handleChange}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="form-group">
                                <label className="form-label">Social Links</label>
                                <div className="form-row">
                                    <input
                                        type="email"
                                        name="email"
                                        className="input"
                                        placeholder="Club Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-row" style={{ marginTop: '0.5rem' }}>
                                    <input
                                        type="text"
                                        name="instagram"
                                        className="input"
                                        placeholder="Instagram handle (@...)"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        style={{ flex: 1 }}
                                    />
                                    <input
                                        type="url"
                                        name="website"
                                        className="input"
                                        placeholder="Website URL"
                                        value={formData.website}
                                        onChange={handleChange}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Add New Member</label>
                                <div className="add-member-row">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Email or Roll Number"
                                        value={newMember.emailOrRoll}
                                        onChange={e => setNewMember(prev => ({ ...prev, emailOrRoll: e.target.value }))}
                                    />
                                    <select
                                        className="select"
                                        value={newMember.role}
                                        onChange={e => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                                    >
                                        <option value="member">Member</option>
                                        <option value="scanner">Scanner</option>
                                        <option value="lead">Club Lead</option>
                                    </select>
                                    <button className="btn btn-primary" onClick={handleAddMember}>Add</button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Manage Members</label>
                                <div className="members-list">
                                    {members.map(member => (
                                        <div key={member.id} className="member-row">
                                            <img src={member.avatar} alt={member.name} className="member-avatar-sm" />
                                            <div className="member-details">
                                                <span className="member-name">{member.name}</span>
                                                <span className="member-roll">{member.rollNumber}</span>
                                            </div>
                                            <select
                                                className="select role-select"
                                                value={member.role}
                                                onChange={e => handleRoleChange(member.id, e.target.value)}
                                            >
                                                <option value="member">Member</option>
                                                <option value="scanner">Scanner</option>
                                                <option value="lead">Club Lead</option>
                                            </select>
                                            {member.role !== 'lead' && (
                                                <button
                                                    className="btn btn-ghost btn-sm text-danger"
                                                    onClick={() => handleRemoveMember(member.id)}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="3,6 5,6 21,6" />
                                                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
