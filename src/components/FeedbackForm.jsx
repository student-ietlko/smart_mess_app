import React, { useState } from 'react';

function FeedbackForm({ studentId }) {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('Complaint');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!feedbackText.trim()) {
      setMessage('Feedback cannot be empty.');
      setLoading(false);
      return;
    }
    
    // MOCK submission delay
    setTimeout(() => {
        setMessage(`✅ Feedback submitted successfully for ID ${studentId}!`);
        setFeedbackText('');
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="feedback-form-container dashboard-content-block">
      <h3>📝 Submit General Mess Complaints or Suggestions</h3>
      <form onSubmit={handleSubmit}>
        
        <select value={feedbackType} onChange={(e) => setFeedbackType(e.target.value)}>
          <option value="Complaint">Complaint</option>
          <option value="Suggestion">Suggestion</option>
        </select>

        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter your detailed complaint or suggestion here..."
          rows="5"
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
        
        {message && <p className={message.includes('success') ? 'success-message' : 'info-message'}>{message}</p>}
      </form>
    </div>
  );
}

export default FeedbackForm;