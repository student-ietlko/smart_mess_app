import React, { useState } from 'react';

const ISSUE_CATEGORIES = [
  'Electrical/Room Maintenance',
  'Plumbing/Washroom',
  'Hygine and Cleanliness',
  'Administration/Fine Dispute',
  'Other'
];

function HostelIssueForm({ user }) {
  const [category, setCategory] = useState(ISSUE_CATEGORIES[0]);
  const [location, setLocation] = useState(user.roomNo || ''); 
  const [issueDescription, setIssueDescription] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!issueDescription.trim() || !location.trim()) {
      setMessage('⚠️ Please provide a location and a detailed description.');
      setLoading(false);
      return;
    }

    // --- MOCK Submission Logic ---
    setTimeout(() => {
        setMessage(`✅ Success! Your **${category}** issue in **${location}** has been reported. A maintenance team will check it within 24 hours.`);
        setIssueDescription('');
        setIsUrgent(false);
        setLoading(false);
        setTimeout(() => setMessage(null), 5000);
    }, 1500);
  };

  return (
    <div className="hostel-issue-form">
      <h4>🛠️ Report a Maintenance or Administrative Issue</h4>
      <p>Please provide accurate details. Urgent issues will be prioritized.</p>

      <form onSubmit={handleSubmit} className="form-layout form-issue">
        
        <div className="form-group">
            <label htmlFor="category">Issue Category:</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                {ISSUE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="location">Specific Location (Room/Washroom/Common Hall):</label>
            <input 
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Room 305 Fan, 2nd Floor Washroom"
                required
            />
        </div>

        <div className="form-group full-width">
            <label htmlFor="description">Detailed Issue Description:</label>
            <textarea
                id="description"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                rows="5"
                placeholder="The fan in my room is making a loud noise and barely spinning. The switch is sparking."
                required
            />
        </div>

        <div className="form-group urgency-check full-width">
            <label>
                <input 
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                />
                **Mark as Urgent** (e.g., Major water leak, non-functional light/fan in summer)
            </label>
        </div>

        <button type="submit" disabled={loading} className="full-width">
          {loading ? 'Submitting Report...' : 'Submit Issue Report'}
        </button>
      </form>
      
      {message && <p className={message.includes('Success') ? 'success-message' : 'error-message'}>{message}</p>}
    </div>
  );
}

export default HostelIssueForm;