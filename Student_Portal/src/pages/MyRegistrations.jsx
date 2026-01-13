import { useState } from 'react';
import { registrations } from '../data/mockData';
import RegistrationCard from '../components/RegistrationCard';
import './MyRegistrations.css';

export default function MyRegistrations() {
    const [activeTab, setActiveTab] = useState('upcoming');

    const tabs = [
        { id: 'upcoming', label: 'Upcoming', count: registrations.filter(r => r.status === 'upcoming').length },
        { id: 'completed', label: 'Completed', count: registrations.filter(r => r.status === 'completed').length },
        { id: 'cancelled', label: 'Cancelled', count: registrations.filter(r => r.status === 'cancelled').length }
    ];

    const filteredRegistrations = registrations.filter(r => r.status === activeTab);

    const getEmptyMessage = () => {
        switch (activeTab) {
            case 'upcoming':
                return "You don't have any upcoming event registrations. Browse events to find something exciting!";
            case 'completed':
                return "You haven't attended any events yet. Your completed events will appear here.";
            case 'cancelled':
                return "No cancelled registrations. All your event plans are on track!";
            default:
                return "No registrations found.";
        }
    };

    return (
        <div className="registrations-page">
            <div className="page-header">
                <h1 className="page-title">My Registrations</h1>
                <p className="page-subtitle">Manage your event registrations and view attendance history</p>
            </div>

            {/* Tabs */}
            <div className="tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        {tab.count > 0 && <span className="tab-count">{tab.count}</span>}
                    </button>
                ))}
            </div>

            {/* Registrations List */}
            <div className="registrations-list">
                {filteredRegistrations.length > 0 ? (
                    filteredRegistrations.map(registration => (
                        <RegistrationCard key={registration.id} registration={registration} />
                    ))
                ) : (
                    <div className="empty-state card">
                        <div className="empty-state-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                        </div>
                        <h3 className="empty-state-title">No registrations</h3>
                        <p className="empty-state-description">{getEmptyMessage()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
