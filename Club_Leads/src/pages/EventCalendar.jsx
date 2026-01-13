import { useState, useMemo } from 'react';
import { calendarEvents, venues } from '../data/mockData';
import './EventCalendar.css';

export default function EventCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedVenue, setSelectedVenue] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const filteredEvents = useMemo(() => {
        let result = calendarEvents;
        if (selectedVenue) {
            result = result.filter(e => e.venue === selectedVenue);
        }
        return result;
    }, [selectedVenue]);

    const getEventsForDate = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return filteredEvents.filter(event => {
            const eventStart = new Date(event.date);
            const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
            const current = new Date(dateStr);
            return current >= eventStart && current <= eventEnd;
        });
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const checkConflicts = (event) => {
        return filteredEvents.filter(e => {
            if (e.id === event.id) return false;
            if (e.venue !== event.venue) return false;

            const eStart = new Date(`${e.date}T${e.startTime}`);
            const eEnd = new Date(`${e.endDate || e.date}T${e.endTime}`);
            const eventStart = new Date(`${event.date}T${event.startTime}`);
            const eventEnd = new Date(`${event.endDate || event.date}T${event.endTime}`);

            return (eventStart < eEnd && eventEnd > eStart);
        });
    };

    const renderCalendar = () => {
        const days = [];
        const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

        for (let i = 0; i < totalCells; i++) {
            const day = i - firstDayOfMonth + 1;
            const isCurrentMonth = day > 0 && day <= daysInMonth;
            const dayEvents = isCurrentMonth ? getEventsForDate(day) : [];
            const isToday = isCurrentMonth &&
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();

            days.push(
                <div
                    key={i}
                    className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                    onClick={() => isCurrentMonth && dayEvents.length > 0 && setSelectedDate({ day, events: dayEvents })}
                >
                    <span className="day-number">{isCurrentMonth ? day : ''}</span>
                    {isCurrentMonth && dayEvents.length > 0 && (
                        <div className="day-events">
                            {dayEvents.slice(0, 2).map(event => (
                                <div
                                    key={event.id}
                                    className={`event-pill ${checkConflicts(event).length > 0 ? 'conflict' : ''}`}
                                    title={event.title}
                                >
                                    {event.title}
                                </div>
                            ))}
                            {dayEvents.length > 2 && (
                                <span className="more-events">+{dayEvents.length - 2} more</span>
                            )}
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="calendar-page">
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Event Calendar</h1>
                    <p className="page-subtitle">View all approved events and check for conflicts</p>
                </div>
            </div>

            <div className="calendar-toolbar card">
                <div className="calendar-nav">
                    <button className="btn btn-ghost" onClick={goToPreviousMonth}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <h2 className="current-month">{monthNames[month]} {year}</h2>
                    <button className="btn btn-ghost" onClick={goToNextMonth}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={goToToday}>Today</button>
                </div>
                <div className="venue-filter">
                    <label className="filter-label">Filter by Venue:</label>
                    <select
                        className="select"
                        value={selectedVenue}
                        onChange={(e) => setSelectedVenue(e.target.value)}
                    >
                        <option value="">All Venues</option>
                        {venues.map(venue => (
                            <option key={venue} value={venue}>{venue}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="calendar-container card">
                <div className="calendar-header">
                    {dayNames.map(day => (
                        <div key={day} className="day-header">{day}</div>
                    ))}
                </div>
                <div className="calendar-grid">
                    {renderCalendar()}
                </div>
            </div>

            <div className="legend-card card">
                <h3 className="legend-title">Legend</h3>
                <div className="legend-items">
                    <div className="legend-item">
                        <div className="legend-color normal"></div>
                        <span>Event</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color conflict"></div>
                        <span>Venue Conflict</span>
                    </div>
                </div>
            </div>

            {selectedDate && (
                <div className="modal-overlay" onClick={() => setSelectedDate(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Events on {monthNames[month]} {selectedDate.day}</h3>
                            <button className="btn btn-ghost" onClick={() => setSelectedDate(null)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            {selectedDate.events.map(event => {
                                const conflicts = checkConflicts(event);
                                return (
                                    <div key={event.id} className="event-detail-item">
                                        <h4 className="event-title">{event.title}</h4>
                                        <p className="event-time">{event.startTime} - {event.endTime}</p>
                                        <p className="event-venue">📍 {event.venue}</p>
                                        {conflicts.length > 0 && (
                                            <div className="conflict-warning">
                                                ⚠️ Conflicts with: {conflicts.map(c => c.title).join(', ')}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
