import React, { useState } from 'react';
// import { BACKEND_URL } from '../App'; 

const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

function MessOffForm({ studentId }) {
  const [durationType, setDurationType] = useState('single'); 
  const [singleDate, setSingleDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mealsToSkip, setMealsToSkip] = useState([]);
  const [reason, setReason] = useState(''); 
  
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const handleMealChange = (meal) => {
    setMealsToSkip(prev => 
      prev.includes(meal) 
        ? prev.filter(m => m !== meal) 
        : [...prev, meal].sort() 
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (mealsToSkip.length === 0) {
      setMessage('⚠️ Please select at least one meal to skip.');
      setLoading(false);
      return;
    }
    if (durationType === 'single' && !singleDate) {
      setMessage('⚠️ Please select a date for the mess off.');
      setLoading(false);
      return;
    }
    if (durationType === 'range') {
      if (!startDate || !endDate || new Date(startDate) >= new Date(endDate)) {
        setMessage('⚠️ Please select a valid start and end date (End date must be after Start date).');
        setLoading(false);
        return;
      }
    }
    
    const dateInfo = durationType === 'single' 
      ? `on ${singleDate}` 
      : ` from ${startDate} to ${endDate}`;
    
    // --- MOCK Submission Logic ---
    setTimeout(() => {
        setLoading(false);
        setMealsToSkip([]); 
        setSingleDate('');
        setStartDate('');
        setEndDate('');
        setReason('');

        setMessage(`✅ Success! Mess off request ${dateInfo} for meals (${mealsToSkip.join(', ')}) has been submitted for approval.`);
    }, 1500);
  };

  return (
    <div className="mess-off-form dashboard-content-block">
      <h3>✈️ Formal Mess Off Application</h3>
      <p>Request dates when you will not be availing mess facilities.</p>
      
      <form onSubmit={handleSubmit} className="form-layout">
        
        {/* 1. Duration Type Selection */}
        <div className="form-group-radio">
            <label className="form-label">Duration Type:</label>
            <div className="radio-options">
                <label>
                    <input 
                        type="radio"
                        value="single"
                        checked={durationType === 'single'}
                        onChange={() => { setDurationType('single'); setStartDate(''); setEndDate(''); }}
                    />
                    Single Day
                </label>
                <label>
                    <input 
                        type="radio"
                        value="range"
                        checked={durationType === 'range'}
                        onChange={() => { setDurationType('range'); setSingleDate(''); }}
                    />
                    Date Range (Multiple Days)
                </label>
            </div>
        </div>

        {/* 2. Date/Date Range Input - Conditional Rendering */}
        <div className="date-input-section">
          {durationType === 'single' ? (
            <div className="form-group">
                <label htmlFor="singleDate">Select Date:</label>
                <input 
                    type="date"
                    id="singleDate"
                    value={singleDate}
                    min={getTodayDate()}
                    onChange={(e) => setSingleDate(e.target.value)}
                    required
                />
            </div>
          ) : (
            <div className="date-range-group">
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input 
                        type="date"
                        id="startDate"
                        value={startDate}
                        min={getTodayDate()}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input 
                        type="date"
                        id="endDate"
                        value={endDate}
                        min={startDate || getTodayDate()} 
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
            </div>
          )}
        </div>

        {/* 3. Meal Selection */}
        <div className="form-group-checkbox">
            <label className="form-label">Meals to Skip (Select all that apply):</label>
            <div className="meal-options">
                {MEAL_OPTIONS.map(meal => (
                    <label key={meal}>
                        <input 
                            type="checkbox"
                            checked={mealsToSkip.includes(meal)}
                            onChange={() => handleMealChange(meal)}
                        />
                        {meal}
                    </label>
                ))}
            </div>
        </div>

        {/* 4. Reason for Leave */}
        <div className="form-group">
            <label htmlFor="reason">Reason for Mess Off (Required):</label>
            <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Academic fieldwork, medical leave, or family emergency."
                rows="3"
                required
            />
        </div>
        
        <button type="submit" disabled={loading || mealsToSkip.length === 0 || !reason}>
          {loading ? 'Submitting Application...' : 'Submit Formal Application'}
        </button>
      </form>
      
      {message && <p className={message.includes('Success') ? 'success-message' : 'error-message'}>{message}</p>}
      <p className="mock-note">
        Reminder: Mess off requests typically require approval from the Mess Warden.
      </p>
    </div>
  );
}

export default MessOffForm;