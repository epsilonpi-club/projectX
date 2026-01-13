import { useState, useMemo } from 'react';
import { clubs } from '../data/mockData';
import ClubCard from '../components/ClubCard';
import './Clubs.css';

export default function Clubs() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [...new Set(clubs.map(c => c.category))];

    const filteredClubs = useMemo(() => {
        let result = [...clubs];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(club =>
                club.name.toLowerCase().includes(query) ||
                club.description.toLowerCase().includes(query)
            );
        }

        if (selectedCategory) {
            result = result.filter(club => club.category === selectedCategory);
        }

        return result;
    }, [searchQuery, selectedCategory]);

    return (
        <div className="clubs-page">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Clubs</h1>
                    <p className="page-subtitle">Explore student organizations and find your community</p>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-row">
                <div className="search-filter">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search clubs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    <button
                        className={`filter-chip ${selectedCategory === '' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('')}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clubs Grid */}
            <div className="results-section">
                <span className="results-count">
                    {filteredClubs.length} club{filteredClubs.length !== 1 ? 's' : ''} found
                </span>

                {filteredClubs.length > 0 ? (
                    <div className="clubs-grid grid grid-3">
                        {filteredClubs.map(club => (
                            <ClubCard key={club.id} club={club} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state card">
                        <div className="empty-state-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="empty-state-title">No clubs found</h3>
                        <p className="empty-state-description">
                            Try adjusting your search or filter to find clubs.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
