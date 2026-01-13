import { useState, useEffect } from 'react';
import './SplashScreen.css';
import logo from '../assets/logos/Black logo LQ.png';

export default function SplashScreen({ onComplete }) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start fade out after 800ms
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 800);

        // Complete after 1 second
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 1000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
            <div className="splash-content">
                <div className="splash-logo-container">
                    <div className="splash-logo-ring"></div>
                    <div className="splash-logo-ring ring-2"></div>
                    <div className="splash-logo-ring ring-3"></div>
                    <div className="splash-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                </div>
                <div className="splash-text">
                    <span className="splash-welcome">Welcome to</span>
                    <span className="splash-title">Student Portal</span>
                </div>
            </div>
        </div>
    );
}
