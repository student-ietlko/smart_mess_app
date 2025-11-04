// import React, { useState } from 'react';
// // import { BACKEND_URL } from '../App'; 

// function Login({ onLoginSuccess, onSwitchToSignUp }) { 
//   const [studentId, setStudentId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // --- HARDCODED FIRST LOGIN CREDENTIALS ---
//   const MOCK_ROLL_NUMBER = '1234567890123'; 
//   const MOCK_PASSWORD = 'IET@2025';
//   // -----------------------------------------
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     if (studentId.length !== 13 || isNaN(studentId)) {
//         setError("Roll Number must be a 13-digit number.");
//         setLoading(false);
//         return;
//     }
    
//     setTimeout(() => {
//         if (studentId === MOCK_ROLL_NUMBER && password === MOCK_PASSWORD) {
//             setLoading(false);
//             onLoginSuccess({ 
//                 studentId: studentId, 
//                 name: 'First Time User', 
//                 roll: studentId,
//                 roomNo: '210A' // Mock room number for Hostel features
//             }); 
//         } else {
//             setLoading(false);
//             setError("Invalid Roll Number or Password.");
//         }
//     }, 500);
//   };

//   return (
//     <div className="login-container">
//       <h2>🔑 Member Login</h2>
//       <form onSubmit={handleSubmit} className="login-form">
        
//         <input
//           type="text"
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//           placeholder="Roll Number (e.g., 1234567890123)"
//           maxLength="13"
//           required
//         />
        
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
        
//         <button type="submit" disabled={loading}>
//           {loading ? 'Verifying...' : 'Login'}
//         </button>
        
//         {error && <p className="error-message">⚠️ {error}</p>}
        
//         <p className="mock-note">
//            **MOCK CREDENTIALS**: Roll No: `{MOCK_ROLL_NUMBER}`, Pass: `{MOCK_PASSWORD}`
//         </p>
//       </form>

//       <p className="signup-link">
//         New student? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignUp(); }}>Create an Account</a>
//       </p>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";

function Login({ onLoginSuccess, onSwitchToSignUp }) {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (studentId.length !== 13 || isNaN(studentId)) {
      setError("Roll Number must be a 13-digit number.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollNumber: studentId,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess({
          studentId,
          name: "Logged In User",
          roll: studentId,
          roomNo: "210A",
        });
      } else {
        setError(data.message || "Invalid Roll Number or Password.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>🔑 Member Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Roll Number (13 Digits)"
          maxLength="13"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Login"}
        </button>
        {error && <p className="error-message">⚠️ {error}</p>}
      </form>

      <p className="signup-link">
        New student?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToSignUp();
          }}
        >
          Create an Account
        </a>
      </p>
    </div>
  );
}

export default Login;
