import React, { useState } from 'react';

const WEEKLY_MENU = {
  Monday: {
    Breakfast: 'Poha, Jalebi, Tea/Coffee',
    Lunch: 'Rajma, Rice, Salad, Roti',
    Snacks: 'Samosa, Green Chutney',
    Dinner: 'Chicken Curry/Paneer Curry, Roti, Kheer',
  },
  Tuesday: {
    Breakfast: 'Aloo Paratha, Curd, Pickles',
    Lunch: 'Dal Makhani, Jeera Rice, Onion Salad',
    Snacks: 'Bread Pakora, Ketchup',
    Dinner: 'Mix Veg, Dal Fry, Rice, Roti',
  },
  Wednesday: {
    Breakfast: 'Idli, Sambar, Coconut Chutney',
    Lunch: 'Chhole Bhature, Onion Salad',
    Snacks: 'Fruit Salad',
    Dinner: 'Egg Curry/Mushroom Masala, Rice, Roti, Gulab Jamun',
  },
  Thursday: {
    Breakfast: 'Bread Omelette/Veg Sandwich',
    Lunch: 'Kadhi Pakora, Rice, Papad',
    Snacks: 'Maggi',
    Dinner: 'Aloo Gobi, Dal Tadka, Roti',
  },
  Friday: {
    Breakfast: 'Upma, Vada, Tea/Coffee',
    Lunch: 'Chicken Biryani/Veg Biryani, Raita',
    Snacks: 'Biscuits, Chai',
    Dinner: 'Palak Paneer, Peas Pulao, Salad',
  },
  Saturday: {
    Breakfast: 'Plain Dosa, Sambar, Chutney',
    Lunch: 'Chole, Rice, Roti, Salad',
    Snacks: 'Vada Pav',
    Dinner: 'Pizza (Mess Special) / Dal Fry, Rice',
  },
  Sunday: {
    Breakfast: 'Poori Bhaji, Halwa',
    Lunch: 'Special Thali (Two Veg, Dal, Rice, Sweet)',
    Snacks: 'Coffee, Cookies',
    Dinner: 'Pasta, Soup, Salad',
  },
};

function WeeklyMenu() {
  const days = Object.keys(WEEKLY_MENU);
  const meals = Object.keys(WEEKLY_MENU[days[0]]);

  const [selectedDay, setSelectedDay] = useState(days[0]); 
  const [selectedMeal, setSelectedMeal] = useState(meals[0]);
  const [suggestion, setSuggestion] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!suggestion.trim()) {
      setMessage('⚠️ Please enter your suggestion before submitting.');
      setLoading(false);
      return;
    }
    
    // --- MOCK Submission Logic ---
    setTimeout(() => {
        setMessage(`✅ Success! Suggestion for ${selectedMeal} on ${selectedDay} submitted.`);
        setSuggestion('');
        setLoading(false);
        setTimeout(() => setMessage(null), 3000);
    }, 1200);
  };

  return (
    <div className="weekly-menu-container dashboard-content-block">
      
      {/* --- 1. Weekly Menu Table --- */}
      <h3>📅 Suggested Weekly Menu</h3>
      <div className="table-responsive">
          <table className="menu-table">
            <thead>
              <tr>
                <th>Day</th>
                {meals.map(meal => <th key={meal}>{meal}</th>)}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day}>
                  <td>{day}</td>
                  {meals.map(meal => (
                    <td key={`${day}-${meal}`}>{WEEKLY_MENU[day][meal]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      <hr style={{ margin: '40px 0' }} />

      {/* --- 2. Feedback/Suggestion Form --- */}
      <div className="menu-feedback-form">
        <h4>✍️ Suggest an Edit for the Menu</h4>
        <p>Use this form to suggest changes, improvements, or specific dishes you would like added to the menu.</p>

        <form onSubmit={handleSubmit} className="form-layout">
            
            <div className="form-group">
                <label htmlFor="day-select">Select Day:</label>
                <select 
                    id="day-select"
                    value={selectedDay} 
                    onChange={(e) => setSelectedDay(e.target.value)}
                >
                    {days.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="meal-select">Select Meal to Edit:</label>
                <select 
                    id="meal-select"
                    value={selectedMeal} 
                    onChange={(e) => setSelectedMeal(e.target.value)}
                >
                    {meals.map(meal => <option key={meal} value={meal}>{meal}</option>)}
                </select>
            </div>

            <div className="form-group full-width">
                <label htmlFor="suggestion">Your Suggestion (e.g., "Replace Rajma with Chhole on Monday Lunch"):</label>
                <textarea
                    id="suggestion"
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    rows="4"
                    placeholder={`Currently, ${selectedMeal} on ${selectedDay} is: ${WEEKLY_MENU[selectedDay][selectedMeal]}. What would you like to change?`}
                    required
                />
            </div>
            
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Suggestion'}
            </button>
            
            {message && <p className={message.includes('Success') ? 'success-message' : 'error-message'}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default WeeklyMenu;