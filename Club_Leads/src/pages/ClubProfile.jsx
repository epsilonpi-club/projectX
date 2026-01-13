import { useState } from 'react';
import { currentClub } from '../data/mockData';
import './ClubProfile.css';

export default function ClubProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: currentClub.name,
        description: currentClub.description,
        email: currentClub.email,
        instagram: currentClub.instagram,
        facultyName: currentClub.facultyAdvisor.name,
        facultyEmail: currentClub.facultyAdvisor.email
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="club-profile-page">
            <div className="page-header">
                <h1 className="page-title">Club Profile</h1>
                <button className="btn btn-primary" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>

            <div className="profile-grid">
                <div className="profile-header-card card">
                    <img src={currentClub.logo} alt={currentClub.name} className="club-logo" />
                    <h2 className="club-name">{currentClub.name}</h2>
                    <span className="badge">{currentClub.category}</span>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-value">{currentClub.members}</span>
                            <span className="stat-label">Members</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{currentClub.eventsHosted}</span>
                            <span className="stat-label">Events</span>
                        </div>
                    </div>
                </div>

                <div className="profile-section card">
                    <h3 className="section-title">About</h3>
                    {isEditing ? (
                        <textarea name="description" className="textarea" rows={4}
                            value={formData.description} onChange={handleChange} />
                    ) : (
                        <p className="about-text">{currentClub.description}</p>
                    )}
                </div>

                <div className="profile-section card">
                    <h3 className="section-title">Contact</h3>
                    <p>📧 {currentClub.email}</p>
                    <p>📷 {currentClub.instagram}</p>
                </div>

                <div className="profile-section card">
                    <h3 className="section-title">Faculty Advisor</h3>
                    <p><strong>{currentClub.facultyAdvisor.name}</strong></p>
                    <p>{currentClub.facultyAdvisor.email}</p>
                    <p>{currentClub.facultyAdvisor.department}</p>
                </div>
            </div>
        </div>
    );
}
