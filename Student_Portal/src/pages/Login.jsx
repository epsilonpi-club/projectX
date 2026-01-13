import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logos/Black logo LQ.png';

export default function Login({ onLoginSuccess }) {
    const [step, setStep] = useState('roll'); // 'roll' or 'otp'
    const [rollNumber, setRollNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRollSubmit = (e) => {
        e.preventDefault();
        if (!rollNumber.trim()) {
            setError('Please enter your roll number');
            return;
        }
        setError('');
        setStep('otp');
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setError('Please enter the complete OTP');
            return;
        }
        // Trigger login success with splash screen
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    const handleResendOtp = () => {
        setOtp(['', '', '', '', '', '']);
        setError('');
        // Simulate OTP resend
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    {/* Logo */}
                    <div className="login-logo">
                        <div className="logo-icon-large">
                            <img src={logo} alt="Logo" />
                        </div>
                        <h1 className="login-title">Student Portal</h1>
                        <p className="login-subtitle">College Activity Management</p>
                    </div>

                    {step === 'roll' ? (
                        <form onSubmit={handleRollSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="rollNumber" className="form-label">Roll Number</label>
                                <input
                                    type="text"
                                    id="rollNumber"
                                    className="input"
                                    placeholder="Enter your roll number (e.g., 22P61A6731)"
                                    value={rollNumber}
                                    onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                                    autoFocus
                                />
                                {error && <span className="form-error">{error}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-block">
                                Get OTP
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9,18 15,12 9,6" />
                                </svg>
                            </button>

                            <p className="login-help">
                                An OTP will be sent to your registered college email.
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} className="login-form">
                            <div className="form-group">
                                <label className="form-label">Enter OTP</label>
                                <p className="otp-info">
                                    We sent a 6-digit code to your email linked with <strong>{rollNumber}</strong>
                                </p>
                                <div className="otp-inputs">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength="1"
                                            className="otp-input"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            autoFocus={index === 0}
                                        />
                                    ))}
                                </div>
                                {error && <span className="form-error">{error}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-block">
                                Verify & Login
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </button>

                            <div className="login-actions">
                                <button type="button" className="btn btn-ghost" onClick={() => setStep('roll')}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="15,18 9,12 15,6" />
                                    </svg>
                                    Change Roll Number
                                </button>
                                <button type="button" className="btn btn-ghost" onClick={handleResendOtp}>
                                    Resend OTP
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <p className="login-footer">
                    Need help? Contact <a href="mailto:support@college.edu">support@college.edu</a>
                </p>
            </div>
        </div>
    );
}
