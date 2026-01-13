import { useState } from 'react';
import './RegistrationForm.css';

export default function RegistrationForm({ formConfig, eventName, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (fieldId, value) => {
        setFormData(prev => ({ ...prev, [fieldId]: value }));
        // Clear error when user types
        if (errors[fieldId]) {
            setErrors(prev => ({ ...prev, [fieldId]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        formConfig.fields.forEach(field => {
            if (field.required && !formData[field.id]?.trim()) {
                newErrors[field.id] = `${field.label} is required`;
            }
            if (field.type === 'email' && formData[field.id]) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData[field.id])) {
                    newErrors[field.id] = 'Invalid email address';
                }
            }
            if (field.type === 'tel' && formData[field.id]) {
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(formData[field.id].replace(/\D/g, ''))) {
                    newErrors[field.id] = 'Invalid phone number (10 digits required)';
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'tel':
                return (
                    <input
                        type={field.type}
                        id={field.id}
                        className={`input ${errors[field.id] ? 'input-error' : ''}`}
                        placeholder={field.placeholder || ''}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        id={field.id}
                        className={`input textarea ${errors[field.id] ? 'input-error' : ''}`}
                        placeholder={field.placeholder || ''}
                        rows={field.rows || 3}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                );
            case 'select':
                return (
                    <select
                        id={field.id}
                        className={`input select ${errors[field.id] ? 'input-error' : ''}`}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            case 'radio':
                return (
                    <div className="radio-group">
                        {field.options?.map(option => (
                            <label key={option.value} className="radio-label">
                                <input
                                    type="radio"
                                    name={field.id}
                                    value={option.value}
                                    checked={formData[field.id] === option.value}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                />
                                <span className="radio-text">{option.label}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'checkbox':
                return (
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={formData[field.id] || false}
                            onChange={(e) => handleChange(field.id, e.target.checked)}
                        />
                        <span className="checkbox-text">{field.checkboxLabel || field.label}</span>
                    </label>
                );
            default:
                return (
                    <input
                        type="text"
                        id={field.id}
                        className={`input ${errors[field.id] ? 'input-error' : ''}`}
                        placeholder={field.placeholder || ''}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                );
        }
    };

    return (
        <div className="registration-form-overlay">
            <div className="registration-form-modal">
                <div className="form-header">
                    <h2 className="form-title">Register for Event</h2>
                    <p className="form-subtitle">{eventName}</p>
                    <button className="form-close-btn" onClick={onCancel}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="form-body">
                    {formConfig.fields.map(field => (
                        <div key={field.id} className="form-group">
                            <label htmlFor={field.id} className="form-label">
                                {field.label}
                                {field.required && <span className="required-asterisk">*</span>}
                            </label>
                            {renderField(field)}
                            {errors[field.id] && (
                                <span className="form-error">{errors[field.id]}</span>
                            )}
                            {field.helpText && (
                                <span className="form-help">{field.helpText}</span>
                            )}
                        </div>
                    ))}

                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                            Submit Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
