import React, { useState } from 'react';
import HostelIssueForm from './HostelIssueForm';
import MonthlyFeedback from './MonthlyFeedback'; 

const HOSTEL_NAV_PAGES = {
    REPORT_ISSUE: 'Report Maintenance Issue',
    MONTHLY_SURVEY: 'Monthly Mess & Hostel Survey'
};

function HostelServices({ user }) {
    const [hostelPage, setHostelPage] = useState(HOSTEL_NAV_PAGES.REPORT_ISSUE);

    const renderHostelPage = () => {
        switch (hostelPage) {
            case HOSTEL_NAV_PAGES.REPORT_ISSUE:
                return <HostelIssueForm user={user} />;
            case HOSTEL_NAV_PAGES.MONTHLY_SURVEY:
                return <MonthlyFeedback studentId={user.studentId} />; 
            default:
                return <div>Select a service above.</div>;
        }
    };

    return (
        <div className="hostel-services-container dashboard-content-block">
             <h3>🚨 Hostel Services Portal</h3>

             <nav className="dashboard-nav sub-nav">
                {Object.values(HOSTEL_NAV_PAGES).map((pageName) => (
                    <button 
                        key={pageName}
                        className={hostelPage === pageName ? 'nav-active' : 'nav-button'}
                        onClick={() => setHostelPage(pageName)}
                    >
                        {pageName}
                    </button>
                ))}
             </nav>
            
            <section className="hostel-content">
                {renderHostelPage()}
            </section>
        </div>
    );
}

export default HostelServices;