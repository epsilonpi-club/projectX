import { Link } from 'react-router-dom';
import './ClubCard.css';

const categoryColors = {
    Technical: 'badge-tech',
    Cultural: 'badge-cultural',
    Sports: 'badge-sports',
    Literary: 'badge-tech',
    Creative: 'badge-cultural'
};

export default function ClubCard({ club }) {
    return (
        <Link to={`/clubs/${club.id}`} className="club-card card">
            <div className="club-card-content">
                <div className="club-header">
                    <div className="club-logo">
                        <img src={club.logo} alt={club.name} loading="lazy" />
                    </div>
                    <span className={`badge ${categoryColors[club.category] || 'badge'}`}>
                        {club.category}
                    </span>
                </div>

                <h3 className="club-name">{club.name}</h3>
                <p className="club-description">{club.description}</p>

                <div className="club-footer">
                    <div className="club-members">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span>{club.members} members</span>
                    </div>
                    <span className="view-link">
                        View Club
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9,18 15,12 9,6" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
