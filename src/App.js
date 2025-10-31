import React, { useState } from 'react';
import './App.css';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

// Define the URL for your team's backend (KEEP THIS FOR LATER)
export const BACKEND_URL = 'http://localhost:5000'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // State to manage whether to show Login or SignUp
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Login Success Handler
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setAuthMode('login'); 
    console.log(`User logged in: ${userData.studentId}`);
  };
  
  // Logout Function
  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setAuthMode('login'); // Go back to login screen
  };

  const renderAuthComponent = () => {
    if (authMode === 'login') {
      return (
        <Login 
          onLoginSuccess={handleLogin} 
          onSwitchToSignUp={() => setAuthMode('signup')}
        />
      );
    } else {
      return (
        <SignUp 
          switchToLogin={() => setAuthMode('login')} 
        />
      );
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🍽️ Smart Mess Management System</h1>
        {isLoggedIn && (
          <div className="user-info">
            <span className="welcome-text">Welcome, {currentUser.name}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </header>
      
      <main className="app-main">
        {!isLoggedIn ? (
          // Renders either Login or SignUp based on authMode
          <div className="auth-container">
            {renderAuthComponent()}
          </div>
        ) : (
          // Passes user data and logout function to Dashboard
          <Dashboard user={currentUser} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}

export default App;