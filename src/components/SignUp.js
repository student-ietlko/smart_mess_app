// import React, { useState } from 'react';
// // import { BACKEND_URL } from '../App'; 

// function SignUp({ switchToLogin }) { 
//   const [formData, setFormData] = useState({
//     // --- Authentication ---
//     rollNumber: '',
//     password: '',
//     confirmPassword: '',
    
//     // --- Academic Details ---
//     name: '',
//     email: '',
//     course: '',          // New: Course pursuing
//     branch: '',          // New: Branch
//     year: '',            // New: Year of study
    
//     // --- Contact/Hostel Details ---
//     mobileNumber: '',    // New: Mobile Number
//     roomNo: '',          // Existing: Hostel Room Number
//     permanentAddress: '',// New: Permanent Address
//     correspondanceAddress: '', // New: Correspondance Address
    
//     // --- Parent/Guardian Details ---
//     parentName: '',      // New: Parent Name
//     parentMobile: '',    // New: Parent Mobile
//     localGuardianName: '', // New: Local Guardian Name
//     localGuardianMobile: '', // New: Local Guardian Mobile
    
//     // --- Photo conceptual fields (files handled by backend/storage) ---
//     selfPhoto: null,
//     parentPhoto: null,
//   });

//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handles updates for all standard input fields
//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
    
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: type === 'file' ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setMessage(null);
//     setError(null);
//     setLoading(true);

//     // --- Client-Side Validation ---
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       setLoading(false);
//       return;
//     }
//     if (formData.rollNumber.length !== 13 || isNaN(formData.rollNumber)) {
//         setError("Roll Number must be a 13-digit number.");
//         setLoading(false);
//         return;
//     }
//     // Simple check for required fields (can be expanded)
//     if (!formData.branch || !formData.year || !formData.parentName) {
//         setError("Please fill out all required academic and parent fields.");
//         setLoading(false);
//         return;
//     }
//     // --- End Validation ---

//     // --- MOCK Submission Logic ---
//     setTimeout(() => {
//         setLoading(false);
//         setMessage(`✅ Success! Registration data for ${formData.rollNumber} submitted. You can now log in.`);
        
//         // Reset form (keeping a clean state might be better than resetting to empty strings immediately)
//         // setTimeout(() => { switchToLogin(); }, 2000); 
//     }, 1500);
//   };

//   return (
//     <div className="signup-container">
//       <h2>📝 Detailed Member Registration</h2>
//       <p className="mock-note">All fields are required for Hostel record keeping.</p>
      
//       <form onSubmit={handleSubmit} className="signup-form detailed-form">
        
//         {/* --- 1. Authentication Details --- */}
//         <fieldset className="form-section">
//             <legend>🔐 Login Credentials</legend>
//             <input name="rollNumber" type="text" value={formData.rollNumber} onChange={handleChange}
//               placeholder="Roll Number (13 Digits)" maxLength="13" required />
//             <input name="password" type="password" value={formData.password} onChange={handleChange}
//               placeholder="Create Password" required />
//             <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
//               placeholder="Confirm Password" required />
//         </fieldset>
        
//         {/* --- 2. Academic Details --- */}
//         <fieldset className="form-section">
//             <legend>📚 Academic Information</legend>
//             <input name="name" type="text" value={formData.name} onChange={handleChange}
//               placeholder="Full Name" required />
//             <input name="email" type="email" value={formData.email} onChange={handleChange}
//               placeholder="College Email" required />
//             <input name="course" type="text" value={formData.course} onChange={handleChange}
//               placeholder="Course Pursuing (e.g., B.Tech)" required />
            
//             <div className="form-row-2">
//                 <input name="branch" type="text" value={formData.branch} onChange={handleChange}
//                   placeholder="Branch (e.g., CSE)" required />
//                 <input name="year" type="text" value={formData.year} onChange={handleChange}
//                   placeholder="Year of Study (e.g., 2nd Year)" required />
//             </div>
//         </fieldset>

//         {/* --- 3. Contact & Address Details --- */}
//         <fieldset className="form-section">
//             <legend>📞 Contact & Residence</legend>
//             <div className="form-row-2">
//                 <input name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleChange}
//                   placeholder="Mobile Number" required />
//                 <input name="roomNo" type="text" value={formData.roomNo} onChange={handleChange}
//                   placeholder="Hostel Room Number (e.g., 210A)" required />
//             </div>
            
//             <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange}
//               placeholder="Permanent Address" rows="2" required />
//             <textarea name="correspondanceAddress" value={formData.correspondanceAddress} onChange={handleChange}
//               placeholder="Correspondance Address (if different)" rows="2" required />
//         </fieldset>

//         {/* --- 4. Parent/Guardian Details --- */}
//         <fieldset className="form-section">
//             <legend>👨‍👩‍👧‍👦 Parent/Guardian</legend>
//             <input name="parentName" type="text" value={formData.parentName} onChange={handleChange}
//               placeholder="Parent/Guardian Full Name" required />
//             <input name="parentMobile" type="tel" value={formData.parentMobile} onChange={handleChange}
//               placeholder="Parent/Guardian Mobile Number" required />
              
//             <input name="localGuardianName" type="text" value={formData.localGuardianName} onChange={handleChange}
//               placeholder="Local Guardian Name (Optional)" />
//             <input name="localGuardianMobile" type="tel" value={formData.localGuardianMobile} onChange={handleChange}
//               placeholder="Local Guardian Mobile (Optional)" />
//         </fieldset>

//         {/* --- 5. Photo Uploads (Conceptual) --- */}
//         <fieldset className="form-section file-upload-section">
//             <legend>📸 Photo Uploads</legend>
//             <div className="file-input-group">
//                 <label>Self Photo:</label>
//                 <input name="selfPhoto" type="file" onChange={handleChange} accept="image/*" required />
//             </div>
//             <div className="file-input-group">
//                 <label>Parent/Guardian Photo:</label>
//                 <input name="parentPhoto" type="file" onChange={handleChange} accept="image/*" required />
//             </div>
//         </fieldset>
        
//         <button type="submit" disabled={loading}>
//           {loading ? 'Registering...' : 'Complete Registration'}
//         </button>
        
//         {error && <p className="error-message">⚠️ {error}</p>}
//         {message && <p className="success-message">{message}</p>}
//       </form>

//       <p className="login-link">
//         Already a member? <a href="#" onClick={(e) => { e.preventDefault(); switchToLogin(); }}>Go to Login</a>
//       </p>
//     </div>
//   );
// }

// export default SignUp;
import React, { useState } from 'react';

function SignUp({ switchToLogin }) {
  const [formData, setFormData] = useState({
    rollNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    // --- Validation ---
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (formData.rollNumber.length !== 13 || isNaN(formData.rollNumber)) {
      setError("Roll Number must be a 13-digit number.");
      setLoading(false);
      return;
    }

    // --- Backend API call (replace with your backend URL) ---
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollNumber: formData.rollNumber,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Registration successful! You can now log in.");
        setFormData({ rollNumber: '', password: '', confirmPassword: '' });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h2>📝 Member Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          name="rollNumber"
          type="text"
          value={formData.rollNumber}
          onChange={handleChange}
          placeholder="Roll Number (13 Digits)"
          maxLength="13"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create Password"
          required
        />
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>

        {error && <p className="error-message">⚠️ {error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>

      <p className="login-link">
        Already a member?{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); switchToLogin(); }}>
          Go to Login
        </a>
      </p>
    </div>
  );
}

export default SignUp;
