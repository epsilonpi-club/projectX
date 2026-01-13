import { useState, useMemo } from 'react';
import { events, registrations, categories, clubs } from '../data/mockData';
import EventCard from '../components/EventCard';
import './Events.css';

export default function Events() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedClub, setSelectedClub] = useState('');
    const [sortBy, setSortBy] = useState('upcoming');

    const registeredEventIds = registrations.map(r => r.eventId);

    const filteredEvents = useMemo(() => {
        let result = [...events];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(event =>
                event.name.toLowerCase().includes(query) ||
                event.clubName.toLowerCase().includes(query) ||
                event.description.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory) {
            result = result.filter(event => event.category === selectedCategory);
        }

        // Club filter
        if (selectedClub) {
            result = result.filter(event => event.clubId === selectedClub);
        }

        // Sorting
        switch (sortBy) {
            case 'upcoming':
                result.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'popular':
                result.sort((a, b) => (b.totalSeats - b.seatsAvailable) - (a.totalSeats - a.seatsAvailable));
                break;
            case 'recent':
                result.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            default:
                break;
        }

        return result;
    }, [searchQuery, selectedCategory, selectedClub, sortBy]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedClub('');
        setSortBy('upcoming');
    };

    const hasActiveFilters = searchQuery || selectedCategory || selectedClub;

    return (
        <div className="events-page">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Events</h1>
                    <p className="page-subtitle">Discover and register for exciting campus events</p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="filters-section card">
                <div className="search-filter">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search events by name, club, or keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label htmlFor="category-filter" className="filter-label">Category</label>
                        <select
                            id="category-filter"
                            className="filter-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="club-filter" className="filter-label">Club</label>
                        <select
                            id="club-filter"
                            className="filter-select"
                            value={selectedClub}
                            onChange={(e) => setSelectedClub(e.target.value)}
                        >
                            <option value="">All Clubs</option>
                            {clubs.map(club => (
                                <option key={club.id} value={club.id}>{club.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sort-filter" className="filter-label">Sort by</label>
                        <select
                            id="sort-filter"
                            className="filter-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="upcoming">Upcoming First</option>
                            <option value="popular">Most Popular</option>
                            <option value="recent">Recently Added</option>
                        </select>
                    </div>

                    {hasActiveFilters && (
                        <button className="btn btn-ghost clear-btn" onClick={clearFilters}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="results-section">
                <div className="results-header">
                    <span className="results-count">
                        {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                    </span>
                </div>

                {filteredEvents.length > 0 ? (
                    <div className="events-grid grid grid-3">
                        {filteredEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                isRegistered={registeredEventIds.includes(event.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state card">
                        <div className="empty-state-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                                <line x1="8" y1="14" x2="8" y2="14.01" />
                                <line x1="12" y1="14" x2="12" y2="14.01" />
                                <line x1="16" y1="14" x2="16" y2="14.01" />
                            </svg>
                        </div>
                        <h3 className="empty-state-title">No events found</h3>
                        <p className="empty-state-description">
                            Try adjusting your filters or search terms to find what you're looking for.
                        </p>
                        {hasActiveFilters && (
                            <button className="btn btn-primary" onClick={clearFilters}>
                                Clear all filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
