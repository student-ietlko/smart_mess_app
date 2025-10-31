import React, { useState } from 'react';

const MESS_RATINGS = [
    { label: 'Food Quality', key: 'foodQuality' },
    { label: 'Food Variety', key: 'foodVariety' },
    { label: 'Mess Staff Behavior', key: 'messStaff' },
    { label: 'Mess Cleanliness', key: 'messCleanliness' },
];

const HOSTEL_RATINGS = [
    { label: 'General Room Maintenance', key: 'roomMaint' },
    { label: 'Washroom Hygiene', key: 'washroomHygiene' },
    { label: 'Hostel Administration Responsiveness', key: 'adminResp' },
];

function MonthlyFeedback({ studentId }) {
    // Default score of 3 (Neutral)
    const [messScores, setMessScores] = useState(MESS_RATINGS.reduce((acc, item) => ({ ...acc, [item.key]: 3 }), {}));
    const [hostelScores, setHostelScores] = useState(HOSTEL_RATINGS.reduce((acc, item) => ({ ...acc, [item.key]: 3 }), {}));
    const [generalComments, setGeneralComments] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleScoreChange = (type, key, value) => {
        if (type === 'mess') {
            setMessScores(prev => ({ ...prev, [key]: parseInt(value) }));
        } else {
            setHostelScores(prev => ({ ...prev, [key]: parseInt(value) }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // --- MOCK Submission Logic ---
        setTimeout(() => {
            setLoading(false);
            setMessage(`✅ Thank you! Your Monthly Survey for ID ${studentId} has been successfully submitted.`);
            setGeneralComments('');
            setMessScores(MESS_RATINGS.reduce((acc, item) => ({ ...acc, [item.key]: 3 }), {}));
            setHostelScores(HOSTEL_RATINGS.reduce((acc, item) => ({ ...acc, [item.key]: 3 }), {}));
            setTimeout(() => setMessage(null), 5000);
        }, 1500);
    };

    const renderRatingRow = (item, type) => (
        <div key={item.key} className="rating-row">
            <label className="rating-label">{item.label}:</label>
            <div className="rating-input">
                {[1, 2, 3, 4, 5].map(score => (
                    <label key={score}>
                        <input
                            type="radio"
                            name={`${type}-${item.key}`}
                            value={score}
                            checked={(type === 'mess' ? messScores[item.key] : hostelScores[item.key]) === score}
                            onChange={(e) => handleScoreChange(type, item.key, e.target.value)}
                            required
                        />
                        {score}
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="monthly-feedback-container">
            <h3>📊 Monthly Mess & Hostel Feedback Survey</h3>
            <p className="mock-note">
                Please rate the following parameters from **1 (Poor)** to **5 (Excellent)**.
            </p>

            <form onSubmit={handleSubmit}>
                
                <div className="feedback-section mess-section">
                    <h4>🍲 Mess Services Rating</h4>
                    {MESS_RATINGS.map(item => renderRatingRow(item, 'mess'))}
                </div>

                <div className="feedback-section hostel-section">
                    <h4>🚨 Hostel Services Rating</h4>
                    {HOSTEL_RATINGS.map(item => renderRatingRow(item, 'hostel'))}
                </div>
                
                <div className="form-group full-width">
                    <label htmlFor="comments">General Comments/Suggestions (Optional but Encouraged):</label>
                    <textarea
                        id="comments"
                        value={generalComments}
                        onChange={(e) => setGeneralComments(e.target.value)}
                        rows="4"
                        placeholder="Any general feedback on policies, staff, or facilities."
                    />
                </div>
                
                <button type="submit" disabled={loading} className="full-width">
                    {loading ? 'Submitting Survey...' : 'Submit Monthly Feedback'}
                </button>
            </form>

            {message && <p className={message.includes('Success') ? 'success-message' : 'error-message'}>{message}</p>}
        </div>
    );
}

export default MonthlyFeedback;