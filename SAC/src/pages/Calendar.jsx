import { useState } from 'react';
import { calendarEvents } from '../data/mockData';
import './Calendar.css';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [viewMode, setViewMode] = useState('month');

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    // Get events for current month
    const monthEvents = calendarEvents.filter(e => {
        const eDate = new Date(e.date);
        return eDate.getMonth() === currentMonth && eDate.getFullYear() === currentYear;
    });

    const getEventsForDate = (day) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return calendarEvents.filter(e => e.date === dateStr);
    };

    const navigateMonth = (direction) => {
        setCurrentDate(new Date(currentYear, currentMonth + direction, 1));
        setSelectedDate(null);
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Technical': '#6366f1',
            'Cultural': '#ec4899',
            'Sports': '#10b981',
            'Academic': '#f59e0b',
            'Arts': '#8b5cf6',
            'Workshop': '#14b8a6'
        };
        return colors[category] || '#64748b';
    };

    const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

    return (
        <div className="calendar-page">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Event Calendar</h1>
                    <p className="page-subtitle">View all approved events</p>
                </div>
                <div className="view-toggle">
                    <button
                        className={`toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
                        onClick={() => setViewMode('month')}
                    >
                        Month
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
                        onClick={() => setViewMode('week')}
                    >
                        Week
                    </button>
                </div>
            </div>

            <div className="calendar-container">
                <div className="calendar-main">
                    {/* Calendar Header */}
                    <div className="calendar-navigation">
                        <button className="nav-btn" onClick={() => navigateMonth(-1)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15,18 9,12 15,6" />
                            </svg>
                        </button>
                        <h2 className="current-month">
                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <button className="nav-btn" onClick={() => navigateMonth(1)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9,18 15,12 9,6" />
                            </svg>
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="full-calendar">
                        <div className="calendar-weekdays-header">
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                <div key={day} className="weekday-header">{day}</div>
                            ))}
                        </div>
                        <div className="calendar-body">
                            {/* Empty cells for days before month starts */}
                            {[...Array(firstDay)].map((_, i) => (
                                <div key={`empty-${i}`} className="calendar-cell empty"></div>
                            ))}
                            {/* Days of the month */}
                            {[...Array(daysInMonth)].map((_, i) => {
                                const day = i + 1;
                                const dayEvents = getEventsForDate(day);
                                const isToday = new Date().getDate() === day &&
                                    new Date().getMonth() === currentMonth &&
                                    new Date().getFullYear() === currentYear;
                                const isSelected = selectedDate === day;

                                return (
                                    <div
                                        key={day}
                                        className={`calendar-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                                        onClick={() => setSelectedDate(day)}
                                    >
                                        <span className="cell-date">{day}</span>
                                        {dayEvents.length > 0 && (
                                            <div className="cell-events">
                                                {dayEvents.slice(0, 2).map((event, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="cell-event"
                                                        style={{ backgroundColor: getCategoryColor(event.category) }}
                                                    >
                                                        {event.name}
                                                    </div>
                                                ))}
                                                {dayEvents.length > 2 && (
                                                    <span className="more-events">+{dayEvents.length - 2} more</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Category Legend */}
                    <div className="category-legend">
                        {['Technical', 'Cultural', 'Sports', 'Academic', 'Arts', 'Workshop'].map(cat => (
                            <div key={cat} className="legend-item">
                                <span className="legend-color" style={{ backgroundColor: getCategoryColor(cat) }}></span>
                                {cat}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Date Panel */}
                <div className="date-detail-panel">
                    {selectedDate ? (
                        <>
                            <div className="panel-header">
                                <h3 className="panel-date">
                                    {new Date(currentYear, currentMonth, selectedDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </h3>
                                <span className="event-count">{selectedDateEvents.length} event(s)</span>
                            </div>
                            {selectedDateEvents.length > 0 ? (
                                <div className="panel-events">
                                    {selectedDateEvents.map((event, idx) => (
                                        <div key={idx} className="panel-event">
                                            <div
                                                className="event-color-bar"
                                                style={{ backgroundColor: getCategoryColor(event.category) }}
                                            ></div>
                                            <div className="panel-event-content">
                                                <h4 className="panel-event-name">{event.name}</h4>
                                                <p className="panel-event-venue">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                        <circle cx="12" cy="10" r="3" />
                                                    </svg>
                                                    {event.venue}
                                                </p>
                                                <span className="panel-event-category">{event.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-events">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <p>No events scheduled</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-selection">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                <line x1="15" y1="9" x2="15.01" y2="9" />
                            </svg>
                            <p>Click on a date to view events</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
