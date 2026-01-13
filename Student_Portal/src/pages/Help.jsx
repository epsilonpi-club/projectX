import './Help.css';

export default function Help() {
    const faqs = [
        {
            question: 'How do I register for an event?',
            answer: 'Browse the Events page, click on any event card to view details, and click the "Register" button. You will receive a QR code after successful registration.'
        },
        {
            question: 'Where can I find my registration QR code?',
            answer: 'Go to "My Registrations" page. Click on any registered event to view or download your QR code.'
        },
        {
            question: 'What happens if I miss an event I registered for?',
            answer: 'Your attendance will be marked as "Missed" in your registration history.'
        },
        {
            question: 'How do I cancel my registration?',
            answer: 'Go to "My Registrations", find the event you want to cancel, and click the cancel button. Note that some events may not allow cancellation after a certain deadline.'
        }
    ];

    return (
        <div className="help-page">
            <div className="page-header">
                <h1 className="page-title">Help & Support</h1>
                <p className="page-subtitle">Find answers to common questions</p>
            </div>

            {/* FAQ Section */}
            <section className="help-section">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item card">
                            <h3 className="faq-question">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                {faq.question}
                            </h3>
                            <p className="faq-answer">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="help-section">
                <h2 className="section-title">Still need help?</h2>
                <div className="contact-cards">
                    <div className="contact-card card">
                        <div className="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <h3 className="contact-title">Email Support</h3>
                        <p className="contact-description">Get help within 24 hours</p>
                        <a href="mailto:support@college.edu" className="btn btn-primary">
                            epsilonpi.support@gmail.com
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
