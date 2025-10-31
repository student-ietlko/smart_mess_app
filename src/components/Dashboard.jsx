import React, { useState } from 'react';
import WeeklyMenu from './WeeklyMenu';
import MessBill from './MessBill';
import FeedbackForm from './FeedbackForm'; // General Mess Complaint/Suggestion
import MessOffForm from './MessOffForm'; 
import HostelServices from './HostelServices'; 
import MonthlyFeedback from './MonthlyFeedback'; // The new survey component

// Define ALL navigation options with an icon
const NAV_PAGES = {
  WELCOME: { name: 'Welcome', icon: '🏠' },
  MENU: { name: 'Weekly Menu', icon: '🍲' },
  BILLS: { name: 'Monthly Bills', icon: '💰' },
  FEEDBACK: { name: 'General Mess Feedback', icon: '📝' }, 
  MESS_OFF: { name: 'Mess Off Application', icon: '✈️' }, 
  HOSTEL_SERVICES: { name: 'Hostel Services', icon: '🚨' }, 
  MONTHLY_FEEDBACK: { name: 'Monthly Survey', icon: '📊' }
};

function Dashboard({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState(NAV_PAGES.WELCOME.name);

  const renderPage = () => {
    switch (currentPage) {
      case NAV_PAGES.WELCOME.name:
        return (
          <div className="welcome-page dashboard-content-block">
            <h3>{NAV_PAGES.WELCOME.icon} Welcome to your Dashboard, {user.name}!</h3>
            <p>Your Roll Number: {user.roll}</p>
            <p>Use the navigation links above to manage your mess details and hostel services.</p>
          </div>
        );
      case NAV_PAGES.MENU.name:
        return <WeeklyMenu />;
      case NAV_PAGES.BILLS.name:
        return <MessBill studentId={user.studentId} />;
      case NAV_PAGES.FEEDBACK.name:
        return <FeedbackForm studentId={user.studentId} />;
      case NAV_PAGES.MESS_OFF.name:
        return <MessOffForm studentId={user.studentId} />;
      case NAV_PAGES.HOSTEL_SERVICES.name: 
        return <HostelServices user={user} />;
      case NAV_PAGES.MONTHLY_FEEDBACK.name: 
        return <MonthlyFeedback studentId={user.studentId} />;
      default:
        return <div>Page Not Found.</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        {Object.values(NAV_PAGES).map((page) => (
          <button 
            key={page.name}
            className={currentPage === page.name ? 'nav-active' : 'nav-button'}
            onClick={() => setCurrentPage(page.name)}
          >
            {page.icon} {page.name}
          </button>
        ))}
      </nav>

      <section className="dashboard-content">
        {renderPage()}
      </section>
    </div>
  );
}

export default Dashboard;