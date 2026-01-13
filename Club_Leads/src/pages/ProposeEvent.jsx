import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { venues } from '../data/mockData';
import './ProposeEvent.css';

export default function ProposeEvent() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        endDate: '',
        startTime: '',
        endTime: '',
        venue: '',
        expectedParticipants: '',
        registrationDeadline: '',
        hasBudget: false,
        budgetAmount: '',
        budgetDescription: '',
        isPaid: false,
        registrationFee: '',
        paymentMode: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when field is updated
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Event name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.date) newErrors.date = 'Start date is required';
        if (!formData.startTime) newErrors.startTime = 'Start time is required';
        if (!formData.endTime) newErrors.endTime = 'End time is required';
        if (!formData.venue) newErrors.venue = 'Venue is required';
        if (!formData.expectedParticipants) newErrors.expectedParticipants = 'Expected participants is required';

        if (formData.hasBudget && !formData.budgetAmount) {
            newErrors.budgetAmount = 'Budget amount is required when budget is enabled';
        }

        if (formData.isPaid && !formData.registrationFee) {
            newErrors.registrationFee = 'Registration fee is required for paid events';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e, status = 'draft') => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Event created:', { ...formData, status });
            setIsSubmitting(false);
            navigate('/events');
        }, 1000);
    };

    return (
        <div className="propose-event-page">
            <div className="page-header">
                <div className="page-title-section">
                    <button className="btn btn-ghost back-btn" onClick={() => navigate(-1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="page-title">Propose New Event</h1>
                        <p className="page-subtitle">Create a new event for your club</p>
                    </div>
                </div>
            </div>

            <form className="event-form" onSubmit={(e) => handleSubmit(e, 'draft')}>
                {/* Basic Information */}
                <section className="form-section card">
                    <h2 className="section-title">Basic Information</h2>

                    <div className="form-group">
                        <label className="form-label">Event Name *</label>
                        <input
                            type="text"
                            name="name"
                            className={`input ${errors.name ? 'input-error' : ''}`}
                            placeholder="e.g., TechFest 2026 - Hackathon"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description *</label>
                        <textarea
                            name="description"
                            className={`textarea ${errors.description ? 'input-error' : ''}`}
                            placeholder="Describe your event in detail..."
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <span className="form-error">{errors.description}</span>}
                    </div>
                </section>

                {/* Date & Time */}
                <section className="form-section card">
                    <h2 className="section-title">Date & Time</h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Start Date *</label>
                            <input
                                type="date"
                                name="date"
                                className={`input ${errors.date ? 'input-error' : ''}`}
                                value={formData.date}
                                onChange={handleChange}
                            />
                            {errors.date && <span className="form-error">{errors.date}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                className="input"
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                            <span className="form-help">Leave empty for single-day events</span>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Start Time *</label>
                            <input
                                type="time"
                                name="startTime"
                                className={`input ${errors.startTime ? 'input-error' : ''}`}
                                value={formData.startTime}
                                onChange={handleChange}
                            />
                            {errors.startTime && <span className="form-error">{errors.startTime}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Time *</label>
                            <input
                                type="time"
                                name="endTime"
                                className={`input ${errors.endTime ? 'input-error' : ''}`}
                                value={formData.endTime}
                                onChange={handleChange}
                            />
                            {errors.endTime && <span className="form-error">{errors.endTime}</span>}
                        </div>
                    </div>
                </section>

                {/* Venue & Capacity */}
                <section className="form-section card">
                    <h2 className="section-title">Venue & Capacity</h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Venue *</label>
                            <select
                                name="venue"
                                className={`select ${errors.venue ? 'input-error' : ''}`}
                                value={formData.venue}
                                onChange={handleChange}
                            >
                                <option value="">Select a venue</option>
                                {venues.map(venue => (
                                    <option key={venue} value={venue}>{venue}</option>
                                ))}
                            </select>
                            {errors.venue && <span className="form-error">{errors.venue}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Expected Participants *</label>
                            <input
                                type="number"
                                name="expectedParticipants"
                                className={`input ${errors.expectedParticipants ? 'input-error' : ''}`}
                                placeholder="e.g., 100"
                                min="1"
                                value={formData.expectedParticipants}
                                onChange={handleChange}
                            />
                            {errors.expectedParticipants && <span className="form-error">{errors.expectedParticipants}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Registration Deadline</label>
                        <input
                            type="date"
                            name="registrationDeadline"
                            className="input"
                            value={formData.registrationDeadline}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                {/* Budget Section */}
                <section className="form-section card">
                    <div className="section-header">
                        <h2 className="section-title">Budget</h2>
                        <div className="toggle-container">
                            <span className="toggle-label">Requires Budget</span>
                            <button
                                type="button"
                                className={`toggle ${formData.hasBudget ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, hasBudget: !prev.hasBudget }))}
                            />
                        </div>
                    </div>

                    {formData.hasBudget && (
                        <div className="toggle-content">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Budget Amount (₹) *</label>
                                    <input
                                        type="number"
                                        name="budgetAmount"
                                        className={`input ${errors.budgetAmount ? 'input-error' : ''}`}
                                        placeholder="e.g., 50000"
                                        min="0"
                                        value={formData.budgetAmount}
                                        onChange={handleChange}
                                    />
                                    {errors.budgetAmount && <span className="form-error">{errors.budgetAmount}</span>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Budget Description</label>
                                <textarea
                                    name="budgetDescription"
                                    className="textarea"
                                    placeholder="Describe how the budget will be used..."
                                    rows={3}
                                    value={formData.budgetDescription}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}
                </section>

                {/* Paid Event Section */}
                <section className="form-section card">
                    <div className="section-header">
                        <h2 className="section-title">Registration Fee</h2>
                        <div className="toggle-container">
                            <span className="toggle-label">Paid Event</span>
                            <button
                                type="button"
                                className={`toggle ${formData.isPaid ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, isPaid: !prev.isPaid }))}
                            />
                        </div>
                    </div>

                    {formData.isPaid && (
                        <div className="toggle-content">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Registration Fee (₹) *</label>
                                    <input
                                        type="number"
                                        name="registrationFee"
                                        className={`input ${errors.registrationFee ? 'input-error' : ''}`}
                                        placeholder="e.g., 200"
                                        min="0"
                                        value={formData.registrationFee}
                                        onChange={handleChange}
                                    />
                                    {errors.registrationFee && <span className="form-error">{errors.registrationFee}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Payment Mode</label>
                                    <input
                                        type="text"
                                        name="paymentMode"
                                        className="input"
                                        placeholder="e.g., UPI to techclub@upi"
                                        value={formData.paymentMode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Form Actions */}
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => navigate('/events')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-secondary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save as Draft'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => handleSubmit(e, 'pending')}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
                    </button>
                </div>
            </form>
        </div>
    );
}
